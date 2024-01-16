import { Router } from 'express';
import validation from '@core/middlewares/validate.middleware';
import loginValidation from '@components/user/login.validation';
import {login} from './user.controller';

const router: Router = Router();

router.post('/login', [validation(loginValidation)], login);

export default router;