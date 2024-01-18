import { Router } from 'express';
import validation from '@core/middlewares/validate.middleware';
import {setMainAlert, refuseAlert, acceptAlert, deleteAlert, endAlert, updateAlert, createPost, deletePost} from './admin.controller';

const router: Router = Router();

router.post('/setMainAlert', [], setMainAlert);
router.post('/refuseAlert', [], refuseAlert);
router.post('/acceptAlert', [], acceptAlert);
router.post('/deleteAlert', [], deleteAlert);
router.post('/endAlert', [], endAlert);
router.post('/updateAlert', [], updateAlert);
router.post('/createPost', [], createPost);
router.post('/deletePost', [], deletePost);

export default router;








