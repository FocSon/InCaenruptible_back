import {NextFunction, Request, Response} from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '@config/config';
import User from '@models/user.model';
import AppError from '@core/utils/appError';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenString = req.headers.authorization;
  const token = tokenString?.split(' ')[1];
  if (!tokenString) {
    return next(new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', false));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (typeof decoded !== 'object' || decoded.id === undefined) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', false));
    }
    const id: number = decoded.id;

    const user = await User.findOne({where: {id}});
    if (!user) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', false));
    }

    next();
  } catch (error) {
    return next(new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', false));
  }
};

export default isAuth;