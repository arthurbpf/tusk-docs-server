import User from '@modules/users/infra/typeorm/entities/User';

export default interface IListOverdueDocumentsFilter {
	user: User;
	date: Date;
}
