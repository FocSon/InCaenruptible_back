import { Request, Response } from 'express';
import * as Alerts from '@alerts';
import httpStatus from 'http-status';
import alertService from '@components/alert/alert.service';

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

interface requestlistAlert {
  n: string;
  startId: string;
}

const alertsDone = async (req: Request<{}, {}, {}, requestlistAlert>, res: Response) => {
  let n = parseInt(req.query.n, 10);
  if (isNaN(n)) {
    n = 10; 
  }

  let startId = parseInt(req.query.startId, 10);

  const listAlert  = await alertService.alertsDone(n, startId);

  res.status(httpStatus.OK).json({ listAlert });

};


const post = async (req: Request, res: Response) => {

  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.locals.errorMessage = 'The id is undefined';
      res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'The id is undefined' }); 
  }

  const post = await alertService.post(id);
  if (post !== undefined) {
    res.status(httpStatus.OK).json({ post });
  } else {
    res.locals.errorMessage = 'This is an unvalid id for a post';
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'This is an unvalid id for a post' });
  }
};

const posts = async (req: Request<{}, {}, {}, requestlistAlert>, res: Response) => {
  let n = parseInt(req.query.n, 10);
  if (isNaN(n)) {
    n = 10; 
  }

  let startId = parseInt(req.query.startId, 10);

  const listPosts  = await alertService.posts(n, startId);

  res.status(httpStatus.OK).json({ listPosts });

};

export { alertsDone };
export { post };
export { posts };
export { requestAlert };
