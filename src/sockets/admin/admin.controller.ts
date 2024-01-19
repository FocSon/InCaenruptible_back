import SocketIO from 'socket.io';
import { adminInit } from '@sockets/admin/admin.actions';

export default (socket: SocketIO.Socket) => ({
  watchRequest: (data) => {
    const { requestId } = data;

    socket.join(`request-${requestId}`);

    socket.on('disconnect', () => {
      socket.leave(`request-${requestId}`);
    });
  },
  stopWatchRequest: (data) => {
    const { requestId } = data;

    socket.leave(`request-${requestId}`);
  },
  startAdminSession: (data) => {
    adminInit(socket);
    socket.join('admin');

    socket.on('disconnect', () => {
      socket.leave('admin');
    });
  },
  endAdminSession: (data) => {
    socket.leave('admin');
  },
})
