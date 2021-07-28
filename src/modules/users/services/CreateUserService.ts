import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import HashProvider from '@shared/providers/HashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	username: string;
	password: string;
	nickname: string;
	email: string;
}

export default class CreateUserService {
	private usersRepository: IUsersRepository;

	constructor() {
		this.usersRepository = new UsersRepository();
	}

	private hashProvider = new HashProvider();

	async execute(data: IRequest): Promise<User> {
		const { email, nickname, password, username } = data;

		const createdUser = await this.usersRepository.create({
			email,
			nickname,
			password: await this.hashProvider.hash(password),
			username,
		});

		return createdUser;
	}
}
