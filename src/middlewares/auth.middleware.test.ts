import User from '@models/user.model';
import {hashSync} from 'bcrypt';
import jwt from 'jsonwebtoken';
import httpMocks from 'node-mocks-http';
import {Request, Response} from 'express';
import isAuth from './auth.middleware';
import AppError from '@core/utils/appError';
import httpStatus from 'http-status';

describe('Auth middleware', () => {
  jest.spyOn(User, 'findOne').mockResolvedValue({
    id: 1,
    username: 'admin',
    password: hashSync('thePassword', 10),
  } as User);

  test('should call next middleware in the stack with no errors if token is valid', async () => {
    const validToken = jwt.sign({id: 1}, process.env.JWT_SECRET as string);
    const next = jest.fn();
    const res: Response = httpMocks.createResponse();
    const req: Request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/user/:action/?id=999',
      headers: {
        authorization: `Bearer ${validToken}`,
      },
    });

    await isAuth(req, res, next);

    // next function is called with zero arguments if request object is valid
    expect(next.mock.calls[0][0]).toBe(undefined);
    expect(next).toHaveBeenCalled();
  });

  test('should return 401 if token is not provided', async () => {
    const next = jest.fn();
    const res: Response = httpMocks.createResponse();
    const req: Request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/user/:action/?id=999',
      headers: {},
    });

    await isAuth(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', false)
    );
  });

  test('should return 401 if token is not valid', async () => {
    const next = jest.fn();
    const res: Response = httpMocks.createResponse();
    const req: Request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/user/:action/?id=999',
      headers: {
        authorization: `Bearer invalidToken`,
      },
    });

    await isAuth(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized', false)
    );
  });
});