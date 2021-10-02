import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateClientDTO {
	name: string;
	description: string;
	createdBy: User;
}
