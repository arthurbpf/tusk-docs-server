import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const router = Router();
const usersController = new UsersController();

router.post('/', usersController.create);
// Authenticated routes
router.use(ensureAuthentication);
router.get('/me', usersController.getLoggedUserInfo);

export default router;
