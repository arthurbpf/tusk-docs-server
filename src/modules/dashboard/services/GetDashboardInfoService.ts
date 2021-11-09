import ListDocumentsService from '@modules/documents/services/ListDocumentsService';
import ListOverdueDocumentsService from '@modules/documents/services/ListOverdueDocumentsService';
import ListUnpaidDocumentsService from '@modules/documents/services/ListUnpaidDocumentsService';
import User from '@modules/users/infra/typeorm/entities/User';

interface IResponse {
	overdueDocuments: number;
	unpaidDocuments: number;
	documents: number;
}

export default class getDashboardInfoService {
	public async execute(user: User): Promise<IResponse> {
		const listOverdueDocumentsService = new ListOverdueDocumentsService();
		const overdueDocuments = await listOverdueDocumentsService.execute({
			user,
			date: new Date(),
		});

		const listUnpaidDocumentsService = new ListUnpaidDocumentsService();
		const unpaidDocuments = await listUnpaidDocumentsService.execute(user);

		const listDocumentsService = new ListDocumentsService();
		const documents = await listDocumentsService.execute({ user });

		return {
			overdueDocuments: overdueDocuments.length,
			unpaidDocuments: unpaidDocuments.length,
			documents: documents.length,
		};
	}
}
