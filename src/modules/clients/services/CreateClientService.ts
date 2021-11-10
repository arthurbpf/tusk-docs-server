import AppError from '@shared/errors/AppError';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import Client from '../infra/typeorm/entities/Client';
import ClientsRepository from '../infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '../repositories/IClientsRepository';

export default class CreateClientService {
	private clientsRepository: IClientsRepository;

	constructor() {
		this.clientsRepository = new ClientsRepository();
	}

	public async execute(dto: ICreateClientDTO): Promise<Client> {
		const { name, description, createdBy } = dto;

		if (!name) {
			throw new AppError('Name must not be empty.', 400);
		}
		if (!description) {
			throw new AppError('Description must not be empty.', 400);
		}

		return await this.clientsRepository.create({
			name,
			description,
			createdBy,
		});
	}
}
