import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '@components/user/user.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { valid, token } = await userService.login(username, password);
  if (valid) {
    res.status(httpStatus.OK).json({ token });
  } else {
    res.locals.errorMessage = 'Invalid username or password';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'Invalid username or password' });
  }
};

export { login };