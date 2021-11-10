import Document from '@modules/documents/infra/typeorm/entities/Document';
import FindClientByIdService from '@modules/clients/services/FindClientByIdService';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import DocumentsRepository from '@modules/documents/infra/typeorm/repositories/DocumentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	ownerId: string;
}

export default class ListDocumentsByClientService {
	private documentsRepository: IDocumentsRepository;

	constructor() {
		this.documentsRepository = new DocumentsRepository();
	}

	public async execute(data: IRequest): Promise<Document[]> {
		const { ownerId } = data;

		const findClientService = new FindClientByIdService();

		const client = await findClientService.execute(ownerId);

		if (!client) {
			throw new AppError('Client with specified id not found', 404);
		}

		return await this.documentsRepository.listByClient(client);
	}
}
