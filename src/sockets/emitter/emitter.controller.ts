import SocketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import * as Alerts from '@alerts';
import { acceptRequest } from '@alerts';
import { streamAlertData } from '@sockets/client/client.actions';
import { streamRequestData } from '@sockets/admin/admin.actions';
import config from '@config/config';

export default (socket: SocketIO.Socket) => ({
  streamData: async (eventData) => {
    const { data, token } = eventData;

    const decoded = jwt.decode(token);
    if (!decoded) return;
    const id = decoded['id'] as number;
    const isARequest = decoded['isARequest'] as boolean;

    if (isARequest) {
      const request = Alerts.getAlertRequest(id);
      if (!request) return;
      if (!request.socket) request.socket = socket;
      streamRequestData(request.requestId, data);

      if (config.env === 'development' && request.title === 'valid') {
        await acceptRequest(request.requestId);
      }
    } else {
      const alert = Alerts.getAlert(id);
      if (!alert) return;
      if (!alert.socket) alert.socket = socket;
      streamAlertData(alert.id, data);
    }
  },
  stopStream: async (eventData) => {
    const { token } = eventData;

    const decoded = jwt.decode(token);
    if (!decoded) return;
    const id = decoded['id'] as number;
    const isARequest = decoded['isARequest'] as boolean;

    if (isARequest) {
      const request = Alerts.getAlertRequest(id);
      if (!request) return;
      Alerts.removeAlertRequest(id);
    } else {
      const alert = Alerts.getAlert(id);
      if (!alert) return;
      await Alerts.endAlert(alert.id);
    }
  },
})
