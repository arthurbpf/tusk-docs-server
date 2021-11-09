import Document from '@modules/documents/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import DocumentsRepository from '@modules/documents/infra/typeorm/repositories/DocumentsRepository';
import User from '@modules/users/infra/typeorm/entities/User';

export default class ListUnpaidDocumentsService {
	private documentsRepository: IDocumentsRepository;

	constructor() {
		this.documentsRepository = new DocumentsRepository();
	}

	public async execute(user: User): Promise<Document[]> {
		return await this.documentsRepository.listUnpaid(user);
	}
}
