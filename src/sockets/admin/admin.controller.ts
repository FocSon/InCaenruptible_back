import SocketIO from 'socket.io';

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
  }
})
