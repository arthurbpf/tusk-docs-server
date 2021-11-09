import User from '@modules/users/infra/typeorm/entities/User';

export default interface IListDocumentsFilter {
	user: User;
	filters: {
		[key: string]: string;
	};
}
