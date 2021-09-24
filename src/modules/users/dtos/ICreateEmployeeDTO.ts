import Company from '../infra/typeorm/entities/Company';

export default interface ICreateEmployeeDTO {
	fullName: string;
	phoneNumber: string;
	registration: string;
	company: Company;
}
