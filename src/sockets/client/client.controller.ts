import SocketIO from 'socket.io';

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
  }
})
