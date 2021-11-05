import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const router = Router();
const clientsController = new ClientsController();

router.use(ensureAuthentication);
router.post('/', clientsController.create);
router.get('/', clientsController.listUserClients);
router.get('/:id/documents', clientsController.listClientsDocuments);

export default router;
