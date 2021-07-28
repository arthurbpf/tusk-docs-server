import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { NextFunction, Request, Response } from 'express';

export default class SessionsController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | void> {
		try {
			const { email, username, password } = request.body;

			const authService = new AuthenticateUserService();

			const token = await authService.execute({
				password,
				email,
				username,
			});

			return response.json({ token });
		} catch (error) {
			next(error);
		}
	}
}
