import ICreateUserDTO from 'modules/users/dtos/ICreateUserDTO';
import IUsersRepository from 'modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	async create(dto: ICreateUserDTO): Promise<User> {
		const orm = this.ormRepository;

		const { username, password, email, nickname, company, employee } = dto;

		const createdUser = orm.create({
			username,
			password,
			email,
			nickname,
			company,
			employee,
		});

		return await orm.save(createdUser);
	}

	async findById(id: string): Promise<User | undefined> {
		const orm = this.ormRepository;

		return await orm.findOne({
			where: {
				id,
			},
		});
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const orm = this.ormRepository;

		return await orm.findOne({
			where: {
				email,
			},
		});
	}

	async findByUsername(username: string): Promise<User | undefined> {
		const orm = this.ormRepository;

		return await orm.findOne({
			where: {
				username,
			},
		});
	}
}
