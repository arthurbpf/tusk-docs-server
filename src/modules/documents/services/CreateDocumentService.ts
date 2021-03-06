import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';
import IDocumentsRepository from '../repositories/IDocumentsRepository';
import AppError from '@shared/errors/AppError';
import ImageBbProvider from '@shared/providers/StorageProvider/ImageBbProvider';
import FindClientByIdService from '@modules/clients/services/FindClientByIdService';
import Document from '@modules/documents/infra/typeorm/entities/Document';

interface IRequest {
	title: string;
	description: string;
	dueDate: Date;
	value: number;
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
			dueDate,
			value,
			clientId: ownerId,
			fileBuffer,
			originalFileName,
		} = data;

		const findClientService = new FindClientByIdService();

		const owner = await findClientService.execute(ownerId);

		if (!owner) {
			throw new AppError('Client with specified ID not found', 404);
		}

		const imageProvider = new ImageBbProvider();

		const fileUrl = await imageProvider.saveFile(fileBuffer);

		return await this.documentsRepository.create({
			title,
			description,
			dueDate,
			value,
			owner,
			fileUrl,
			originalFileName,
		});
	}
}
