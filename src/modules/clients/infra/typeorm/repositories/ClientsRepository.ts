import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Repository } from 'typeorm';
import Client from '../entities/Client';

export default class ClientsRepository implements IClientsRepository {
	private ormRepository: Repository<Client>;

	constructor() {
		this.ormRepository = getRepository(Client);
	}

	public async create(dto: ICreateClientDTO): Promise<Client> {
		const { name, description, createdBy } = dto;

		const createdUser = this.ormRepository.create({
			name,
			description,
			createdBy,
		});

		return await this.ormRepository.save(createdUser);
	}

	public async findById(id: string): Promise<Client | undefined> {
		return await this.ormRepository.findOne({
			where: {
				id,
			},
		});
	}

	public async findByUser(user: User): Promise<Client[]> {
		return await this.ormRepository.find({
			where: {
				createdBy: user,
			},
		});
	}
}
