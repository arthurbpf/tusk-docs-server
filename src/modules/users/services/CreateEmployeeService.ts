import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import Employee from '../infra/typeorm/entities/Employee';
import EmployeesRepository from '../infra/typeorm/repositories/EmployeesRepository';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

export default class CreateEmployeeService {
	private employeesRepository: IEmployeesRepository;

	constructor() {
		this.employeesRepository = new EmployeesRepository();
	}

	async execute(data: ICreateEmployeeDTO): Promise<Employee> {
		const { company, fullName, phoneNumber, registration } = data;

		return await this.employeesRepository.create({
			fullName,
			phoneNumber,
			registration,
			company,
		});
	}
}
