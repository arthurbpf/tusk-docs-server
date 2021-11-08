import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateDocumentDTO from '@modules/documents/dtos/ICreateDocumentDTO';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import IFilter from '@shared/dtos/IFilter';
import { getRepository, Repository } from 'typeorm';
import Document from '../entities/Document';

export default class DocumentsRepository implements IDocumentsRepository {
	ormRepository: Repository<Document>;

	constructor() {
		this.ormRepository = getRepository(Document);
	}

	public async create(dto: ICreateDocumentDTO): Promise<Document> {
		const {
			title,
			description,
			dueDate,
			value,
			owner,
			fileUrl,
			originalFileName,
		} = dto;

		const createdDocument = this.ormRepository.create({
			title,
			description,
			dueDate,
			value,
			owner,
			fileUrl,
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

	public async list(filters: IFilter[]): Promise<Document[]> {
		return await this.ormRepository.find({
			where: {
				filters,
			},
		});
	}

	public async listByClient(client: Client): Promise<Document[]> {
		return await this.ormRepository.find({
			where: {
				owner: client,
			},
		});
	}
}
