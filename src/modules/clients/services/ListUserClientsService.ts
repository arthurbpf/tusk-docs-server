import User from '@modules/users/infra/typeorm/entities/User';
import Client from '../infra/typeorm/entities/Client';
import ClientsRepository from '../infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '../repositories/IClientsRepository';

export default class {
	private clientsRepository: IClientsRepository;

	constructor() {
		this.clientsRepository = new ClientsRepository();
	}

	public async execute(user: User): Promise<Client[]> {
		return await this.clientsRepository.findByUser(user);
	}
}
