import SocketIO from 'socket.io';
import api from './api';

const io = new SocketIO.Server();

io.on('connection', (socket) => {
  api.socketIoRegister(io, socket)
});

export default io;
