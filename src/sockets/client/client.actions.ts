import SocketIO from 'socket.io';
import * as Alerts from '@alerts';
import { Alert } from '../../types';
import io from '@io';

function parseAlert(alert: Alert) {
  return {
    id: alert.id,
    title: alert.title,
    description: alert.description,
    startTime: alert.startTime,
    endTime: alert.endTime,
    type: alert.type,
    category: alert.category,
  };
}

export const init = (socket: SocketIO.Socket) => {
  const alerts = Alerts.getAlerts();
  const mainAlertId = Alerts.getMainAlertId();
  socket.emit('init', {
    alerts: alerts.map(parseAlert),
    mainAlertId,
  });
};

export const notifyNewAlert = (alert: Alert) => {
  io.emit('newAlert', {
    alert: parseAlert(alert),
  } as any);
};

export const notifyDeleteAlert = (id: number) => {
  io.emit('deleteAlert', {
    id,
  } as any);
};

export const notifyAlertDone = (id: number) => {
  io.emit('alertDone', {
    id,
  } as any);
};

export const notifySetMainAlert = (id: number | null) => {
  io.emit('setMainAlert', {
    id,
  } as any);
};

export const streamAlertData = (id: number, data: any) => {
  io.to(`alert-${id}`).emit('streamAlertData', {
    id,
    data,
  });
};
