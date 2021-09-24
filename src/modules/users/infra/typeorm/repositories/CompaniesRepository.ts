import ICreateCompanyDTO from '@modules/users/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '@modules/users/repositories/ICompaniesRepository';
import { getRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

export default class CompaniesRepository implements ICompaniesRepository {
	private ormRepository: Repository<Company>;

	constructor() {
		this.ormRepository = getRepository(Company);
	}

	async create(dto: ICreateCompanyDTO): Promise<Company> {
		const orm = this.ormRepository;

		const { businessName, legalName, registration } = dto;

		const createdCompany = orm.create({
			businessName,
			legalName,
			registration,
		});

		return await orm.save(createdCompany);
	}
}
