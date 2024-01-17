import { getAlert, getAlertRequest } from '@alerts';

export function notifyEmitterAlertRefused(id) {
  const request = getAlertRequest(id);
  if (!request) return;

  if (request.socket) {
    request.socket.emit('emitter:alertRefused', {
      requestId: id,
    });
  }
}

export function notifyEmitterAlertAccepted(requestId: number, alertId: number, token: string) {
  const alert = getAlert(alertId);
  if (!alert) return;

  if (alert.socket) {
    alert.socket.emit('emitter:alertAccepted', {
      requestId,
      alertId,
      token,
    });
  }
}

export function notifyEmitterAlertDone(id: number, message: string) {
  const request = getAlertRequest(id);
  if (!request) return;

  if (request.socket) {
    request.socket.emit('emitter:alertDone', {
      alertId: id,
      message,
    });
  }
}
