import CreateClientService from '@modules/clients/services/CreateClientService';
import ListUserClientsService from '@modules/clients/services/ListUserClientsService';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default class ClientsController {
	public async create(
		request: Request,
		response: Response,
		_next: NextFunction,
	): Promise<Response | undefined> {
		const { name, description } = request.body;

		const createClientService = new CreateClientService();

		if (!request.user) {
			throw new AppError('Unauthorized', 401);
		}

		return response.json(
			await createClientService.execute({
				name,
				description,
				createdBy: request.user,
			}),
		);
	}

	public async listUserClients(
		request: Request,
		response: Response,
		_next: NextFunction,
	): Promise<Response | undefined> {
		if (!request.user) {
			throw new AppError('Unauthorized', 401);
		}

		const listUserClients = new ListUserClientsService();

		return response.json(await listUserClients.execute(request.user));
	}
}
