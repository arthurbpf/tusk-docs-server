import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';
import CompaniesRepository from '../infra/typeorm/repositories/CompaniesRepository';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

export default class CreateCompanyService {
	private companiesRepository: ICompaniesRepository;

	constructor() {
		this.companiesRepository = new CompaniesRepository();
	}

	async execute(data: ICreateCompanyDTO): Promise<Company> {
		const { businessName, legalName, registration } = data;

		return await this.companiesRepository.create({
			businessName,
			legalName,
			registration,
		});
	}
}
