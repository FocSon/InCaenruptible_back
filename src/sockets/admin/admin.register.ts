import SocketIO from 'socket.io';
import Controller from '@sockets/admin/admin.controller';
import { checkToken } from '../../middlewares/auth.middleware';

export default (io: SocketIO.Server, socket: SocketIO.Socket) => {
  const controller = Controller(socket);

  const requireAdmin = (next: (someData: any) => void) => (data: any) => {
    const { token } = data;
    if (typeof token !== 'string') {
      return;
    }

    const user = checkToken(token);
    if (!user) {
      return;
    }

    next(data);
  };

  socket.on('admin:watchRequest', requireAdmin(controller.watchRequest));
  socket.on('admin:stopWatchRequest', requireAdmin(controller.stopWatchRequest));
  socket.on('admin:startAdminSession', requireAdmin(controller.startAdminSession));
  socket.on('admin:endAdminSession', requireAdmin(controller.endAdminSession));
}
