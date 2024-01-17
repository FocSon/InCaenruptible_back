import { Alert, AlertRequest } from './types';
import { notifyAlertDone, notifyDeleteAlert, notifyNewAlert } from '@sockets/client/client.actions';
import {
  notifyEmitterAlertAccepted,
  notifyEmitterAlertDone,
  notifyEmitterAlertRefused,
} from '@sockets/emitter/emitter.actions';
import config from '@config/config';
import jwt from 'jsonwebtoken';

function genToken(id: number, isARequest: boolean) {
  return jwt.sign({
    id,
    isARequest,
  }, config.jwtSecret);
}

//region Alerts
const activeAlerts = new Map<number, Alert>();
let alertID = 0;

export function createAlert(alert: Omit<Alert, 'id'>) {
  // TODO : Update database
  const nAlter = { ...alert, id: alertID++ };
  activeAlerts.set(nAlter.id, nAlter);

  notifyNewAlert(nAlter);

  return {
    id: nAlter.id,
    token: genToken(nAlter.id, false),
  };
}

export function getAlert(id: number) {
  return activeAlerts.get(id);
}

export function getAlerts() {
  return Array.from(activeAlerts.values());
}

export function getAlertMap() {
  return activeAlerts;
}

export function removeAlert(id: number) {
  activeAlerts.delete(id);
}

export function endAlert(id: number, message?: string) {
  const alert = getAlert(id);
  if (!alert) return;

  alert.endTime = Date.now();
  // TODO : Update database

  notifyAlertDone(id);
  notifyEmitterAlertDone(id, message ?? 'Alert has been ended');

  removeAlert(id);
}

function deleteAlert(id: number) {
  // TODO : Update database
  const alert = getAlert(id);
  if (!alert) return;

  removeAlert(id);
  notifyDeleteAlert(id);
}

//endregion
//region Alert Requests
const alertRequests = new Map<number, AlertRequest>();
let requestID = 0;

export function createAlertRequest(request: Omit<AlertRequest, 'requestId'>) {
  const id = requestID++;
  alertRequests.set(id, { ...request, requestId: id });
  return {
    id,
    token: genToken(id, true),
  };
}

export function getAlertRequest(id: number) {
  return alertRequests.get(id);
}

export function removeAlertRequest(id: number) {
  alertRequests.delete(id);
  // TODO : notify admin that alert request has been removed
}

export function getAlertRequests() {
  return Array.from(alertRequests.values());
}

export function getAlertRequestMap() {
  return alertRequests;
}

export function refuseAlert(id: number) {
  const request = getAlertRequest(id);
  if (!request) return;

  removeAlertRequest(id);
  notifyEmitterAlertRefused(id);
}

export function acceptAlert(requestId: number) {
  const request = getAlertRequest(requestId);
  if (!request) return;

  removeAlertRequest(requestId);

  const { id, token } = createAlert({
    title: request.title,
    description: request.description,
    type: request.type,
    category: request.category,
    socket: request.socket,
    startTime: Date.now(),
    endTime: null,
  });

  notifyEmitterAlertAccepted(requestId, id, token);
}

//endregion
//region Main Alert
let mainAlert: number | null = null;

export function setMainAlertId(id: number | null) {
  mainAlert = id;
}

export function getMainAlertId() {
  return mainAlert;
}

//endregion
