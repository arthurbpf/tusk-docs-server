import { NextFunction, Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

export default class UsersController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const service = new CreateUserService();

		const { email, nickname, password, username } = request.body;

		try {
			const createdUser = await service.execute({
				email,
				nickname,
				password,
				username,
			});

			return response.json(createdUser);
		} catch (error) {
			next(error);
		}
	}

	public async getLoggedUserInfo(
		request: Request,
		response: Response,
		_next: NextFunction,
	): Promise<Response | undefined> {
		if (!request.user) {
			throw new AppError('Cannot be called by unlogged user', 401);
		}

		return response.json(request.user);
	}
}
