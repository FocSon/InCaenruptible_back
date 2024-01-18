import { Alert } from './types';
import AlertModel from '@models/alert.model';

export async function createAlertDB(alert: Omit<Alert, 'id'>) {
  return await AlertModel.create({
    title: alert.title,
    description: alert.description,
    type: alert.type,
    category: alert.category,
    startTime: alert.startTime,
    endTime: alert.endTime,
  } as any)
}

export async function updateAlertDB(id: number, alert: Partial<Alert>) {
  return await AlertModel.update(alert as any, {
    where: {
      id,
    },
  } as any);
}

export async function deleteAlertDB(id: number) {
  return await AlertModel.destroy({
    where: {
      id,
    },
  } as any);
}
