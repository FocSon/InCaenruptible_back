import { Router } from 'express';

// Express
import healthCheck from '@components/healthcheck/healthCheck.router';
import userRouter from '@components/user/user.router';
import alertRouter from '@components/alert/alert.router';
import adminRouter from '@components/admin/admin.router';
// Socket.io
import SocketIO from 'socket.io';
import client from '@sockets/client/client.register';
import emitter from '@sockets/emitter/emitter.register';
import admin from '@sockets/admin/admin.register';

const router: Router = Router();
router.use(healthCheck);
router.use(userRouter);
router.use(alertRouter);
router.use(adminRouter);

function register(io: SocketIO.Server, socket: SocketIO.Socket) {
  client(io, socket);
  emitter(io, socket);
  admin(io, socket);
}

export default {
  expressRouter: router,
  socketIoRegister: register,
};
