import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateDocumentDTO from '@modules/documents/dtos/ICreateDocumentDTO';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import { getRepository, Repository } from 'typeorm';
import Document from '../entities/Document';

export default class DocumentsRepository implements IDocumentsRepository {
	ormRepository: Repository<Document>;

	constructor() {
		this.ormRepository = getRepository(Document);
	}

	public async create(dto: ICreateDocumentDTO): Promise<Document> {
		const { title, description, owner, fileBuffer, originalFileName } = dto;

		const createdDocument = this.ormRepository.create({
			title,
			description,
			owner,
			file: fileBuffer,
			originalFileName,
		});

		return await this.ormRepository.save(createdDocument);
	}

	public async findById(id: string): Promise<Document | undefined> {
		return await this.ormRepository.findOne({
			where: {
				id,
			},
		});
	}

	public async findByClient(client: Client): Promise<Document[]> {
		return await this.ormRepository.find({
			where: {
				owner: client,
			},
		});
	}
}
