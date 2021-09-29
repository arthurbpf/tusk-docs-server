import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompaniesRepository {
	create(dto: ICreateCompanyDTO): Promise<Company>;
	findById(id: string): Promise<Company | undefined>;
}
