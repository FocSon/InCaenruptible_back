import { Router } from 'express';
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

router.post('/setMainAlert', [], setMainAlert);
router.post('/refuseRequest', [], refuseRequest);
router.post('/acceptRequest', [], acceptRequest);
router.post('/deleteAlert', [], deleteAlert);
router.post('/endAlert', [], endAlert);
router.post('/updateAlert', [], updateAlert);
router.post('/createPost', [], createPost);
router.post('/deletePost', [], deletePost);

export default router;








