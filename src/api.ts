import { Router } from 'express';

// Express
import healthCheck from '@components/healthcheck/healthCheck.router';
import userRouter from '@components/user/user.router';
import alertRouter from '@components/alert/alert.router';
import SocketIO from 'socket.io';

const router: Router = Router();
router.use(healthCheck);
router.use(userRouter);
router.use(alertRouter);

// Socket.io
import client from '@sockets/client/client.register';
import emitter from '@sockets/emitter/emitter.register';

function register(io: SocketIO.Server, socket: SocketIO.Socket) {
  client(io, socket);
  emitter(io, socket);
}

export default {
  expressRouter: router,
  socketIoRegister: register,
};
