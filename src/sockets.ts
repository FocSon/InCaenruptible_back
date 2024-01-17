import SocketIO from 'socket.io';
import api from './api';

const io = new SocketIO.Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/socket.io',
});

io.on('connection', (socket) => {
  api.socketIoRegister(io, socket)
});

export default io;
