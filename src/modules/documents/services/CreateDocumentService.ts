import Document from '@modules/documents/infra/typeorm/entities/Document';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';
import FindUserByIdService from '@modules/clients/services/FindUserByIdService';
import AppError from '@shared/errors/AppError';

interface IRequest {
	title: string;
	description: string;
	clientId: string;
	fileBuffer: Buffer;
	originalFileName: string;
}

export default class CreateDocumentService {
	private documentsRepository: IDocumentsRepository;

	constructor() {
		this.documentsRepository = new DocumentsRepository();
	}

	public async execute(data: IRequest): Promise<Document> {
		const {
			title,
			description,
			clientId: ownerId,
			fileBuffer,
			originalFileName,
		} = data;

		const findClientService = new FindUserByIdService();

		const owner = await findClientService.execute(ownerId);

		if (!owner) {
			throw new AppError('Client with specified ID not found', 401);
		}

		return await this.documentsRepository.create({
			title,
			description,
			owner,
			fileBuffer,
			originalFileName,
		});
	}
}
