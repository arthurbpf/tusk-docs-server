import Document from '@modules/documents/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import DocumentsRepository from '@modules/documents/infra/typeorm/repositories/DocumentsRepository';
import IListOverdueDocumentsFilter from '../dtos/IListOverdueDocumentsFilter';

export default class ListOverdueDocumentsService {
	private documentsRepository: IDocumentsRepository;

	constructor() {
		this.documentsRepository = new DocumentsRepository();
	}

	public async execute(
		data: IListOverdueDocumentsFilter,
	): Promise<Document[]> {
		const { user, date } = data;

		return await this.documentsRepository.listOverdue({ user, date });
	}
}
