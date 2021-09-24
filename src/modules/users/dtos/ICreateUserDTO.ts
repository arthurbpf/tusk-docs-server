import Company from '../infra/typeorm/entities/Company';
import Employee from '../infra/typeorm/entities/Employee';

export default interface ICreateUserDTO {
	username: string;
	password: string;
	nickname: string;
	email: string;

	company?: Company;
	employee?: Employee;
}
