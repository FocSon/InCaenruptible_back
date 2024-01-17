import SocketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import * as Alerts from '@alerts';
import { streamAlertData } from '@sockets/client/client.actions';
import { acceptAlert } from '@alerts';

export default (socket: SocketIO.Socket) => ({
  streamData: (eventData) => {
    const { data, token } = eventData;

    const decoded = jwt.decode(token);
    if (!decoded) return;
    const id = decoded['id'] as number;
    const isARequest = decoded['isARequest'] as boolean;

    if (isARequest) {
      const request = Alerts.getAlertRequest(id);
      if (!request) return;
      if (!request.socket) request.socket = socket;
      // TODO: Do admin streaming of request data
      acceptAlert(request.requestID)
    } else {
      const alert = Alerts.getAlert(id);
      if (!alert) return;
      if (!alert.socket) alert.socket = socket;
      streamAlertData(alert.id, data);
    }
  },
  stopStream: (eventData) => {
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
      Alerts.endAlert(alert.id);
    }
  },
})
