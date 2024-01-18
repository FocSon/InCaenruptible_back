import { Router } from 'express';
import validation from '@core/middlewares/validate.middleware';
import { requestAlertValidation, requestPostValidation } from '@components/alert/requestAlert.validation';
import { alertsDone, post, posts, requestAlert } from './alert.controller';

const router: Router = Router();

router.post('/requestAlert', [validation(requestAlertValidation)], requestAlert);
router.get('/alertsDone', [], alertsDone);
router.get('/post/:id', [validation(requestPostValidation)], post);
router.get('/posts', [], posts);


export default router;
