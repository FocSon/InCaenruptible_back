import SocketIO from 'socket.io';
import Controller from '@sockets/admin/admin.controller';
import { adminInit } from '@sockets/admin/admin.actions';

export default (io: SocketIO.Server, socket: SocketIO.Socket) => {
  const controller = Controller(socket);

  const adminSocket = socket.use((socket, next) => {
    // TODO : token authentication
    // const { token } = socket.handshake.query;
    // if (typeof token !== 'string') {
    //   return next(new Error('authentication error'));
    // }
    //
    // const user = checkToken(token);
    // if (!user) {
    //   return next(new Error('authentication error'));
    // }

    next();
  });

  adminSocket.on('watchRequest', controller.watchRequest);
  adminSocket.on('stopWatchRequest', controller.stopWatchRequest);

  adminInit(adminSocket);
}
