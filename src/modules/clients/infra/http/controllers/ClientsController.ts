import CreateClientService from '@modules/clients/services/CreateClientService';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default class ClientsController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { name, description } = request.body;

		const createClientService = new CreateClientService();

		if (!request.user) {
			throw new AppError('Unauthorized', 401);
		}

		return response.json(
			createClientService.execute({
				name,
				description,
				createdBy: request.user,
			}),
		);
	}
}
