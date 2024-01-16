import express, { Application } from 'express';

import api from 'api';
import httpContext from 'express-http-context';
import consts from '@config/consts';
import httpLogger from '@core/utils/httpLogger';
import errorHandling from '@core/middlewares/errorHandling.middleware';
import uniqueReqId from '@core/middlewares/uniqueReqId.middleware';
import http404 from '@components/404/404.router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors({
  origin: '*', // TODO: change this to the client's URL
}));
app.use(cookieParser());
app.use(httpContext.middleware);
app.use(httpLogger.successHandler);
app.use(httpLogger.errorHandler);
app.use(uniqueReqId);
app.use(express.json());
app.use(consts.API_ROOT_PATH, api);
app.use(http404);

app.use(errorHandling);

export default app;