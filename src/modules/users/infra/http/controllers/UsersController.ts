import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const service = new CreateUserService();

		try {
			const { email, nickname, password, username } = request.body;

			const createdUser = await service.execute({
				email,
				nickname,
				password,
				username,
			});

			return response.json(createdUser);
		} catch (error) {
			return response.json(error);
		}
	}
}
