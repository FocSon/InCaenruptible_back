import { Request, Response } from 'express';
import * as Alerts from '@alerts';
import httpStatus from 'http-status';
import adminService from '@components/admin/admin.service';

const setMainAlert = async (req: Request, res: Response) => {
    const { id } = req.body;
    const alert = await Alerts.getAlert(id);
    if (alert === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for an alert';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for an alert' });
      return;
    }
    await Alerts.setMainAlertId(id);
};

const refuseAlert = async (req: Request, res: Response) => {
    
    const { id } = req.body;
    const alert = await Alerts.getAlert(id);
    if (alert === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for an alert';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for an alert' });
      return;
    }
    await Alerts.refuseAlert(id);
};

const acceptAlert = async (req: Request, res: Response) => {
    const { id, title, description, category } = req.body;
    const alert = await Alerts.acceptAlert(id);
    if (alert === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for an alert';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for an alert' });
      return;
    }
    await Alerts.acceptAlert(id);
};

const deleteAlert = async (req: Request, res: Response) => {
    const { id } = req.body;
    const alert = await Alerts.getAlert(id);
    if (alert === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
    await Alerts.deleteAlert(id);
};

const endAlert = async (req: Request, res: Response) => {
    const { id } = req.body;
    const alert = await Alerts.getAlert(id);
    if (alert === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for an alert';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for an alert' });
      return;
    }
    const msg = 'Your alert has been deleted'
    Alerts.endAlert(id,msg)
    //res.status(httpStatus.OK).json({ msg });
};

const updateAlert = async (req: Request, res: Response) => {
    const post = await adminService.updateAlert(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
};

const createPost = async (req: Request, res: Response) => {
    const post = await adminService.createPost(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
};

const deletePost = async (req: Request, res: Response) => {
    const post = await adminService.deletePost(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
};


export {
  setMainAlert,
  refuseAlert,
  acceptAlert,
  deleteAlert,
  endAlert,
  updateAlert,
  createPost,
  deletePost,
};
  




