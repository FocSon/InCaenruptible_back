import { Server } from 'http';
import app from '@app';
import config from '@config/config';
import logger from '@core/utils/logger';
import errorHandler from '@core/utils/errorHandler';
import sequelize from './models/db';
import io from '@io'

// Import models
import '@models/user.model';
import User from '@models/user.model';
import { hashSync } from 'bcrypt';

const { port } = config;

io.attachApp(app);

const server: Server = app.listen(port, (): void => {
  logger.info(`Listening on port ${port}`);

  // Init database
  sequelize.sync({ alter: true }).then(async () => {
    logger.info('Database connected');

    const userCount = await User.count();
    if (userCount === 0) {
      await User.create({
        username: 'admin',
        password: hashSync('admin', 10),
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
