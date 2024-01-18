import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '@config/config';
import User from '@models/user.model';
import AppError from '@core/utils/appError';

export function checkToken(token?: string) {
  if (!token) {
    return undefined;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (typeof decoded !== 'object' || decoded.id === undefined) {
      return undefined;
    }

    const id: number = decoded.id;

    const user = User.findOne({ where: { id } });
    if (!user) {
      return undefined;
    }

    return user;
  } catch (error) {
    return undefined;
  }
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenString = req.headers.authorization;
  const token = tokenString?.split(' ')[1];
  const user = checkToken(token);
  if (!user) {
    return next(new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', false));
  }

  next();
};

export default isAuth;
