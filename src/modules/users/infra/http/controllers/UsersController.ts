import { NextFunction, Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const service = new CreateUserService();

		const { email, nickname, password, username, employee, company } =
			request.body;

		try {
			const createdUser = await service.execute({
				email,
				nickname,
				password,
				username,
				employee,
				company,
			});

			return response.json(createdUser);
		} catch (error) {
			next(error);
		}
	}
}
