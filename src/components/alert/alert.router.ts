import { Router } from 'express';
import validation from '@core/middlewares/validate.middleware';
import requestAlertValidation from '@components/alert/requestAlert.validation';
import {requestAlert} from './alert.controller';

const router: Router = Router();

router.post('/requestAlert', [validation(requestAlertValidation)], requestAlert);

export default router;
