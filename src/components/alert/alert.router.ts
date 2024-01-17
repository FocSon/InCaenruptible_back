import { Router } from 'express';
import validation from '@core/middlewares/validate.middleware';
import requestAlertValidation from '@components/alert/requestAlert.validation';
import {requestAlert} from './alert.controller';
import {alertsDone} from './alert.controller';
import {post} from './alert.controller';
import {posts} from './alert.controller';

const router: Router = Router();

router.post('/requestAlert', [validation(requestAlertValidation)], requestAlert);
router.get('/alertsDone', [], alertsDone )
router.get('/post/:id', [], post )
router.get('/posts', [], posts )


export default router;
