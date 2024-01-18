import { Router } from 'express';
import validation from '@core/middlewares/validate.middleware';
import {
    setMainAlertValidation,
    refuseRequestValidation,
    acceptRequestValidation,
    deleteAlertValidation,
    endAlertValidation,
    updateAlertValidation,
    createPostValidation,
    deletePostValidation,

} from '@components/admin/admin.validation';

import {
  acceptRequest,
  createPost,
  deleteAlert,
  deletePost,
  endAlert,
  refuseRequest,
  setMainAlert,
  updateAlert,
} from './admin.controller';

const router: Router = Router();

router.post('/setMainAlert', [validation(setMainAlertValidation)], setMainAlert);
router.post('/refuseRequest', [validation(refuseRequestValidation)], refuseRequest);
router.post('/acceptRequest', [validation(acceptRequestValidation)], acceptRequest);
router.post('/deleteAlert', [validation(deleteAlertValidation)], deleteAlert);
router.post('/endAlert', [validation(endAlertValidation)], endAlert);
router.post('/updateAlert', [validation(updateAlertValidation)], updateAlert);
router.post('/createPost', [validation(createPostValidation)], createPost);
router.post('/deletePost', [validation(deletePostValidation)], deletePost);

export default router;








