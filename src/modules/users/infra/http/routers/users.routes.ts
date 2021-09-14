import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();
const usersController = new UsersController();

router.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			nickname: Joi.string().required(),
			username: Joi.string().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create,
);

export default router;
