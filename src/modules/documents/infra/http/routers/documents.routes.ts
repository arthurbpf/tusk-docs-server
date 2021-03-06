import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import DocumentsController from '../controllers/DocumentsController';

const upload = multer(uploadConfig);

const router = Router();
const documentsController = new DocumentsController();

router.use(ensureAuthentication);
router.post('/', upload.single('file'), documentsController.create);
router.get('/', documentsController.listDocuments);
router.patch('/:id', documentsController.patchDocument);

export default router;
