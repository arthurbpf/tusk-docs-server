import Document from '@modules/documents/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import DocumentsRepository from '@modules/documents/infra/typeorm/repositories/DocumentsRepository';
import IListDocumentsFilter from '../dtos/IListDocumentsFilter';

export default class ListDocumentsService {
	private documentsRepository: IDocumentsRepository;

	constructor() {
		this.documentsRepository = new DocumentsRepository();
	}

	public async execute(data: IListDocumentsFilter): Promise<Document[]> {
		const { user, filters } = data;

		return await this.documentsRepository.list({ user, filters });
	}
}
