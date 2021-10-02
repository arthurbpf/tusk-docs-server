import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routers/users.routes';
import sessionsRouter from '@modules/users/infra/http/routers/sessions.routes';
import clientsRouter from '@modules/clients/infra/http/routers/clients.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/clients', clientsRouter);

export default router;
