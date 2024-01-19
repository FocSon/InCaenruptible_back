import { Alert, AlertRequest } from './types';
import { notifyAlertDone, notifyDeleteAlert, notifyNewAlert, notifySetMainAlert } from '@sockets/client/client.actions';
import {
  notifyEmitterAlertAccepted,
  notifyEmitterAlertDone,
  notifyEmitterAlertRefused,
} from '@sockets/emitter/emitter.actions';
import config from '@config/config';
import jwt from 'jsonwebtoken';
import { notifyDeleteRequest, notifyNewRequest } from '@sockets/admin/admin.actions';
import { createAlertDB, deleteAlertDB, updateAlertDB } from './alerts.service';

function genToken(id: number, isARequest: boolean) {
  return jwt.sign({
    id,
    isARequest,
  }, config.jwtSecret);
}

//region Alerts
const activeAlerts = new Map<number, Alert>();

export async function createAlert(alert: Omit<Alert, 'id'>) {
  const alertDb = await createAlertDB(alert);
  const nAlter = { ...alert, id: alertDb.id };
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

  if (id === mainAlert) {
    setMainAlertId(null);
  }
}

export async function endAlert(id: number, message?: string) {
  const alert = getAlert(id);
  if (!alert) return;

  alert.endTime = Date.now();
  await updateAlertDB(id, {
    endTime: alert.endTime,
  });

  notifyAlertDone(id);
  notifyEmitterAlertDone(id, message ?? 'Alert has been ended');

  removeAlert(id);
}

export async function deleteAlert(id: number) {
  const alert = getAlert(id);
  if (!alert) return;

  await deleteAlertDB(id);

  notifyDeleteAlert(id);
  notifyEmitterAlertDone(id, 'Alert has been deleted');
  removeAlert(id);
}

//endregion
//region Alert Requests
const alertRequests = new Map<number, AlertRequest>();
let requestID = 1;

export function createAlertRequest(request: Omit<AlertRequest, 'requestId'>) {
  const id = requestID++;
  const newRequest = { ...request, requestId: id };
  alertRequests.set(id, newRequest);
  notifyNewRequest(newRequest);
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
  notifyDeleteRequest(id);
}

export function getAlertRequests() {
  return Array.from(alertRequests.values());
}

export function getAlertRequestMap() {
  return alertRequests;
}

export function refuseRequest(id: number) {
  const request = getAlertRequest(id);
  if (!request) return;

  notifyEmitterAlertRefused(id);
  removeAlertRequest(id);
}

export async function acceptRequest(requestId: number) {
  const request = getAlertRequest(requestId);
  if (!request) return;

  removeAlertRequest(requestId);

  const { id, token } = await createAlert({
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
  notifySetMainAlert(mainAlert);
}

export function getMainAlertId() {
  return mainAlert;
}

//endregion
