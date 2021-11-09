import { Router } from 'express';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import DashboardController from '../controllers/DashboardController';

const router = Router();
const dashboardController = new DashboardController();

router.use(ensureAuthentication);
router.get('/', dashboardController.getDashboardInfo);

export default router;
