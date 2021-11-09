import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routers/users.routes';
import sessionsRouter from '@modules/users/infra/http/routers/sessions.routes';
import clientsRouter from '@modules/clients/infra/http/routers/clients.routes';
import documentsRouter from '@modules/documents/infra/http/routers/documents.routes';
import dashboardRouter from '@modules/dashboard/infra/http/routers/dashboard.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/clients', clientsRouter);
router.use('/documents', documentsRouter);
router.use('/dashboard', dashboardRouter);

export default router;
