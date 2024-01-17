import SocketIO from 'socket.io';
import * as Alerts from '@alerts';
import { AlertRequest } from '../../types';
import io from '@io';

function parseRequest(request: AlertRequest) {
  return {
    requestId: request.requestId,
    title: request.title,
    description: request.description,
    type: request.type,
    category: request.category,
  };
}

export const adminInit = (socket: SocketIO.Socket) => {
  const requests = Alerts.getAlertRequests();
  socket.emit('admin:init', {
    requests: requests.map(parseRequest),
  });
};

export const notifyNewRequest = (request: AlertRequest) => {
  io.emit('admin:newRequest', {
    request: parseRequest(request),
  } as any);
};

export const notifyDeleteRequest = (requestId: number) => {
  io.emit('admin:requestDeleted', {
    requestId,
  } as any);
};

export const streamRequestData = (id: number, data: any) => {
  io.to(`request-${id}`).emit('streamRequestData', {
    id,
    data,
  });
};
