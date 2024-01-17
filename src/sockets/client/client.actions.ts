import SocketIO from 'socket.io';
import * as Alerts from '@alerts';
import { Alert } from '../../types';
import io from '@io';

export const init = (socket: SocketIO.Socket) => {
  const alerts = Alerts.getAlerts();
  const mainAlertId = Alerts.getMainAlertId();
  socket.emit('init', {
    alerts,
    mainAlertId,
  });
};

export const notifyNewAlert = (alert: Alert) => {
  io.emit('newAlert', {
    alert,
  });
};

export const notifyDeleteAlert = (id: number) => {
  io.emit('deleteAlert', {
    id,
  });
}

export const notifyAlertDone = (id: number) => {
  io.emit('alertDone', {
    id,
  });
}

export const notifySetMainAlert = (id: number | null) => {
  io.emit('setMainAlert', {
    id,
  });
}

export const streamAlertData = (id: number, data: any) => {
  io.to(`alert-${id}`).emit('streamData', {
    id,
    data,
  });
}
