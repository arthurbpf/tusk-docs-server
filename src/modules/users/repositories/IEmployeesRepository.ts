import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import Employee from '../infra/typeorm/entities/Employee';

export default interface IEmployeesRepository {
	create(dto: ICreateEmployeeDTO): Promise<Employee>;
}
