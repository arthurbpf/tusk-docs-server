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

		const { username, password, email, nickname } = dto;

		const createdUser = orm.create({
			username,
			password,
			email,
			nickname,
		});

		return await orm.save(createdUser);
	}

	async findById(id: string): Promise<User | undefined> {
		const orm = this.ormRepository;

		return orm.findOne({
			where: {
				id,
			},
		});
	}
}
