import SocketIO from 'socket.io';
import Controller from '@sockets/client/client.controller';
import { init } from '@sockets/client/client.actions';

export default (io: SocketIO.Server, socket: SocketIO.Socket) => {
  const controller = Controller(socket);

  socket.on('watchAlert', controller.watchAlert);
  socket.on('stopWatchAlert', controller.stopWatchAlert);
  socket.on('askInit', controller.askInit);

  init(socket);
}
