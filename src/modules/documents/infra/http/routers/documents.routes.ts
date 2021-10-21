import { Router } from 'express';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import DocumentsController from '../controllers/DocumentsController';

const router = Router();
const documentsController = new DocumentsController();

router.use(ensureAuthentication);
router.post('/', documentsController.create);
