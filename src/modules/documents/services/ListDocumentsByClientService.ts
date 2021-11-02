import Document from '@modules/documents/infra/typeorm/entities/Document';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';
import FindClientByIdService from '@modules/clients/services/FindClientByIdService';
import AppError from '@shared/errors/AppError';

interface IRequest {
	ownerId: string;
}

export default class ListDocumentService {
	private documentsRepository: IDocumentsRepository;

	constructor() {
		this.documentsRepository = new DocumentsRepository();
	}

	public async execute(data: IRequest): Promise<Document[]> {
		const { ownerId } = data;

		const findClientService = new FindClientByIdService();

		const client = await findClientService.execute(ownerId);

		if (!client) {
			throw new AppError('Client with specified id not found', 401);
		}

		return await this.documentsRepository.listByClient(client);
	}
}
