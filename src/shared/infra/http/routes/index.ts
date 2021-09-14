import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routers/users.routes';
import sessionsRouter from '@modules/users/infra/http/routers/sessions.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

export default router;
