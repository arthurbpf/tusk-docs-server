import ICreateEmployeeDTO from '@modules/users/dtos/ICreateEmployeeDTO';
import IEmployeeRepository from '@modules/users/repositories/IEmployeesRepository';
import { getRepository, Repository } from 'typeorm';
import Employee from '../entities/Employee';

export default class EmployeesRepository implements IEmployeeRepository {
	private ormRepository: Repository<Employee>;

	constructor() {
		this.ormRepository = getRepository(Employee);
	}

	async create(dto: ICreateEmployeeDTO): Promise<Employee> {
		const orm = this.ormRepository;

		const { company, fullName, phoneNumber, registration } = dto;

		const createdCompany = orm.create({
			fullName,
			phoneNumber,
			registration,
			company,
		});

		return await orm.save(createdCompany);
	}
}
