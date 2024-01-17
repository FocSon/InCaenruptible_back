import SocketIO from 'socket.io';
import Controller from '@sockets/client/client.controller';

export default (io: SocketIO.Server, socket: SocketIO.Socket) => {
  const controller = Controller(socket);

  socket.on('watchAlert', controller.watchAlert);
  socket.on('stopWatchAlert', controller.stopWatchAlert);
}
