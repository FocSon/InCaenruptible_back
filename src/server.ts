import { Server } from 'http';
import app from '@app';
import config from '@config/config';
import logger from '@core/utils/logger';
import errorHandler from '@core/utils/errorHandler';
import sequelize from './models/db';
import http from 'http';
import io from '@io';
import { hashSync } from 'bcrypt';

// Import models
import '@models/user.model';
import User from '@models/user.model';
import Post from '@models/post.model';
import Alert from '@models/alert.model';
import AlertPost from '@models/alertPost.model';

const { port } = config;

const httpServer = http.createServer(app);
io.attach(httpServer);

const server: Server = httpServer.listen(port, (): void => {
  logger.info(`Listening on port ${port}`);

  // Init database
  sequelize.sync({ force: true }).then(async () => {
    logger.info('Database connected');

    // User 
    const userCount = await User.count();
    if (userCount === 0) {
      await User.create({
        username: 'admin',
        password: hashSync('admin', 10),
      });
    }

    // Alert
    const alertCount = await Alert.count();
    if (alertCount === 0) {
      await Alert.create({
        title: 'pollution des eaux aux rives de l orne.',
        description: 'des passants balancent des dechets',
        type: 'video',
        category: 'pollution',
        startTime: new Date(),
        endTime: null,
      });
    }

    // Post
    const postCount = await Post.count();
    if (postCount === 0) {
      await Post.create({
        title: 'pollution des eaux aux rives de l orne.',
        description: 'des passants balancent des dechets',
        content: 'video',
        publishingTime: new Date(),
        alertIds: null,
      });
    }

    
    const alertPostCount = await AlertPost.count();
    if (alertPostCount === 0) {
      const alert1 = await Alert.findOne();
      const post1 = await Post.findOne();
      await AlertPost.create({
          postId: post1.id,
          alertId: alert1.id,
      });
    }

  });
});

const exitHandler = (): void => {
  if (app) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error): void => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    exitHandler();
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (app) {
    server.close();
  }
});
