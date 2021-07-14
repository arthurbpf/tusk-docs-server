import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
	create(dto: ICreateUserDTO): Promise<User>;
	findById(id: string): Promise<User | undefined>;
}
