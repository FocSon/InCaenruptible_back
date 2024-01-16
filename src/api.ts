import { Router } from 'express';

import healthCheck from '@components/healthcheck/healthCheck.router';
import userRouter from '@components/user/user.router';

const router: Router = Router();
router.use(healthCheck);
router.use(userRouter);

export default router;
