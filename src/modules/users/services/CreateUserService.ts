import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import HashProvider from '@shared/providers/HashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import CreateCompanyService from './CreateCompanyService';
import CreateEmployeeService from './CreateEmployeeService';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';

interface IBaseUserRequest {
	username: string;
	password: string;
	nickname: string;
	email: string;
}

interface ICompanyRequest extends IBaseUserRequest {
	company: ICreateCompanyDTO;
	employee: never;
}

interface IEmployeeRequest extends IBaseUserRequest {
	employee: ICreateEmployeeDTO;
	company: never;
}

type IRequest = ICompanyRequest | IEmployeeRequest;
export default class CreateUserService {
	private usersRepository: IUsersRepository;

	constructor() {
		this.usersRepository = new UsersRepository();
	}

	private hashProvider = new HashProvider();

	async execute(data: IRequest): Promise<User> {
		const { email, nickname, password, username, company, employee } = data;

		const emailExits = await this.usersRepository.findByEmail(email);

		if (emailExits) {
			throw new AppError('User with informed email already exists', 400);
		}

		const usernameExists = await this.usersRepository.findByUsername(
			username,
		);

		if (usernameExists) {
			throw new AppError(
				'User with informed username already exists',
				400,
			);
		}

		let createdUser = undefined;

		if (company) {
			const service = new CreateCompanyService();
			const createdCompany = await service.execute(company);

			createdUser = await this.usersRepository.create({
				email,
				nickname,
				password: await this.hashProvider.hash(password),
				username,
				company: createdCompany,
			});
		}
		if (employee) {
			const service = new CreateEmployeeService();
			const createdEmployee = await service.execute(employee);

			createdUser = await this.usersRepository.create({
				email,
				nickname,
				password: await this.hashProvider.hash(password),
				username,
				employee: createdEmployee,
			});
		} else {
			throw new AppError(
				'Please provide either company or employee information',
				400,
			);
		}

		return createdUser;
	}
}
