import Client from '../infra/typeorm/entities/Client';
import ClientsRepository from '../infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '../repositories/IClientsRepository';

export default class CreateClientService {
	private clientsRepository: IClientsRepository;

	constructor() {
		this.clientsRepository = new ClientsRepository();
	}

	public async execute(id: string): Promise<Client | undefined> {
		return await this.clientsRepository.findById(id);
	}
}
