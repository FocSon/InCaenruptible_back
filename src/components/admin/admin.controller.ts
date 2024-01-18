import { Request, Response } from 'express';
import * as Alerts from '@alerts';
import httpStatus from 'http-status';
import adminService from '@components/admin/admin.service';

const setMainAlert = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (id === null) {
    await Alerts.setMainAlertId(null);
    return res.status(httpStatus.OK).json({});
  }

  const alert = await Alerts.getAlert(id);
  if (alert === undefined) {
    res.locals.errorMessage = 'This is an invalid id for an alert';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an invalid id for an alert' });
    return;
  }
  await Alerts.setMainAlertId(id);
  res.status(httpStatus.OK).json({});
};

const refuseRequest = async (req: Request, res: Response) => {
  const { id } = req.body;
  const request = await Alerts.getAlertRequest(id);
  if (request === undefined) {
    res.locals.errorMessage = 'This is an invalid id for a request';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an invalid id for a request' });
    return;
  }
  await Alerts.refuseRequest(id);
  res.status(httpStatus.OK).json({});
};

const acceptRequest = async (req: Request, res: Response) => {
  const { id } = req.body;
  const request = await Alerts.getAlertRequest(id);
  if (request === undefined) {
    res.locals.errorMessage = 'This is an invalid id for a request';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an invalid id for a request' });
    return;
  }
  await Alerts.acceptRequest(id);
  res.status(httpStatus.OK).json({});
};

const deleteAlert = async (req: Request, res: Response) => {
  const { id } = req.body;
  const alert = await Alerts.getAlert(id);
  if (alert === undefined) {
    res.locals.errorMessage = 'This is an invalid id for a post';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an invalid id for a post' });
    return;
  }
  await Alerts.deleteAlert(id);
  res.status(httpStatus.OK).json({});
};

const endAlert = async (req: Request, res: Response) => {
  const { id, message } = req.body;
  const alert = await Alerts.getAlert(id);
  if (alert === undefined) {
    res.locals.errorMessage = 'This is an invalid id for an alert';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an invalid id for an alert' });
    return;
  }

  const msg = message ?? 'Your alert has been deleted';
  await Alerts.endAlert(id, msg);
  res.status(httpStatus.OK).json({ msg });
};

const updateAlert = async (req: Request, res: Response) => {
  const { id, title, description, category } = req.body;
  const good = await adminService.updateAlert(id, {
    title,
    description,
    category,
  });

  if (!good) {
    res.locals.errorMessage = 'This is an invalid id for an alert';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an invalid id for an alert' });
    return;
  }
  res.status(httpStatus.OK).json({});
};

const createPost = async (req: Request, res: Response) => {
  const { id, title, description, content } = req.body;
  const post = await adminService.createPost(id, title, description, content);

  if (post === undefined) {
    res.locals.errorMessage = 'Error while creating the new post';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'Error while creating the new post' });
    return;
  }
  res.status(httpStatus.OK).json({ post });
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.body;
  const good = await adminService.deletePost(id);
  if (!good) {
    res.locals.errorMessage = 'This is an invalid id for a post';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an invalid id for a post' });
    return;
  }
  res.status(httpStatus.OK).json({});
};


export {
  setMainAlert,
  refuseRequest,
  acceptRequest,
  deleteAlert,
  endAlert,
  updateAlert,
  createPost,
  deletePost,
};
  




