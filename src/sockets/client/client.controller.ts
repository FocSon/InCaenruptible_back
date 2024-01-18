import SocketIO from 'socket.io';
import { init } from '@sockets/client/client.actions';

export default (socket: SocketIO.Socket) => ({
  watchAlert: (data) => {
    const { id } = data;

    socket.join(`alert-${id}`);

    socket.on('disconnect', () => {
      socket.leave(`alert-${id}`);
    });
  },
  stopWatchAlert: (data) => {
    const { id } = data;

    socket.leave(`alert-${id}`);
  },
  askInit: (data) => {
    init(socket)
  }
})
