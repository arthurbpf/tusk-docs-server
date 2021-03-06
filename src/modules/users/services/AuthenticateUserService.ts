import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import HashProvider from '@shared/providers/HashProvider';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

type IRequest = {
	password: string;
} & ({ email: string; username?: never } | { email?: never; username: string });

interface IResponse {
	token: string;
	user: User;
}

export default class AuthenticateUserService {
	private usersRepository: IUsersRepository;

	constructor() {
		this.usersRepository = new UsersRepository();
	}

	public async execute(data: IRequest): Promise<IResponse> {
		const genericError = new AppError('Invalid username/password informed');

		if (!data.password || (!data.email && !data.username)) {
			throw genericError;
		}

		const getUser = async () => {
			if (data.email) {
				return await this.usersRepository.findByEmail(data.email);
			}

			if (data.username) {
				return await this.usersRepository.findByUsername(data.username);
			}
		};

		const user = await getUser();

		if (!user) {
			throw genericError;
		}

		const hashProvider = new HashProvider();

		const passwordMatches = await hashProvider.compare(
			data.password,
			user.password,
		);

		if (!passwordMatches) {
			throw genericError;
		}

		const token = sign({}, authConfig.jwt.secret, {
			expiresIn: authConfig.jwt.expiresIn,
			subject: user.id,
		});

		return { token, user };
	}
}
