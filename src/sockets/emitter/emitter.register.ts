import SocketIO from 'socket.io';
import Controller from '@sockets/emitter/emitter.controller';

export default (io: SocketIO.Server, socket: SocketIO.Socket) => {
  const controller = Controller(socket);

  socket.on('streamData', controller.streamData);
  socket.on('stopStream', controller.stopStream);
}
