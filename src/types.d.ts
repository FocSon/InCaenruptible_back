import SocketIO from 'socket.io';

export type AppModule = {
  name: string;
  router: any;
  path: string;
  models: any[];
}

export type alertType = 'video' | 'image' | 'data';
export type alertCategory = 'pollution' | 'noise' | 'deterioration'

export type AlertRequest = {
  requestID: number;
  title: string;
  description: string;
  type: alertType;
  category: alertCategory;
  socket?: SocketIO.Socket;
}

export type Alert = {
  id: number;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  type: alertType;
  category: alertCategory;
  socket?: SocketIO.Socket;
}
