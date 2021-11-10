import Document from '@modules/documents/infra/typeorm/entities/Document';
import IUpdateDocumentDTO from '../dtos/IUpdateDocumentDTO';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';

export default class UpdateDocumentService {
	private documentsRepository: IDocumentsRepository;

	constructor() {
		this.documentsRepository = new DocumentsRepository();
	}

	public async execute(
		data: IUpdateDocumentDTO,
	): Promise<Document | undefined> {
		const { id, properties } = data;

		return await this.documentsRepository.update({ id, properties });
	}
}
