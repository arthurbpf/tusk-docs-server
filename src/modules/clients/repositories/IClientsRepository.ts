import User from '@modules/users/infra/typeorm/entities/User';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
	create(dto: ICreateClientDTO): Promise<Client>;
	findById(id: string): Promise<Client | undefined>;
	findByUser(user: User): Promise<Client[]>;
}
