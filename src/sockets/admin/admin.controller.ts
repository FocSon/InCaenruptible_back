import SocketIO from 'socket.io';
import { adminInit } from '@sockets/admin/admin.actions';

export default (socket: SocketIO.Socket) => ({
  watchRequest: (data) => {
    const { id } = data;

    socket.join(`request-${id}`);

    socket.on('disconnect', () => {
      socket.leave(`request-${id}`);
    });
  },
  stopWatchRequest: (data) => {
    const { id } = data;

    socket.leave(`request-${id}`);
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
