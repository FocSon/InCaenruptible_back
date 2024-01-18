import { Request, Response } from 'express';
import * as Alerts from '@alerts';
import httpStatus from 'http-status';
import adminService from '@components/admin/admin.service';

const setMainAlert = async (req: Request, res: Response) => {
    const post = await adminService.setMainAlert(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
};

const refuseAlert = async (req: Request, res: Response) => {
    const post = await adminService.refuseAlert(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
};

const acceptAlert = async (req: Request, res: Response) => {
    const post = await adminService.acceptAlert(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
};

const deleteAlert = async (req: Request, res: Response) => {
    const post = await adminService.deleteAlert(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
};

const endAlert = async (req: Request, res: Response) => {
    const post = await adminService.endAlert(id);
    if (post === undefined) {
      res.locals.errorMessage = 'This is an unvalid id for a post';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
      return;
    }
  
    res.status(httpStatus.OK).json({ post });
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
  




