import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

export default class GetUserInfoService {
	private usersRepository: UsersRepository;

	constructor() {
		this.usersRepository = new UsersRepository();
	}

	async execute(userId: string): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		return user;
	}
}
