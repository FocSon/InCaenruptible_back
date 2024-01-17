import { Request, Response } from 'express';
import * as Alerts from '@alerts';
import httpStatus from 'http-status';

const requestAlert = async (req: Request, res: Response) => {
  const {
    title,
    description,
    type,
    category,
  } = req.body;

  if (type !== 'video') {
    // TODO manage valid devices
  } else {
    const { id, token } = Alerts.createAlertRequest({
      title,
      description,
      type,
      category,
    });

    res.status(httpStatus.OK).json({
      requestID: id,
      token,
    });
  }
};

export { requestAlert };
