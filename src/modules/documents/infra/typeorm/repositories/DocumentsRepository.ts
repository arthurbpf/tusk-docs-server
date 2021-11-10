import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateDocumentDTO from '@modules/documents/dtos/ICreateDocumentDTO';
import IListDocumentsFilter from '@modules/documents/dtos/IListDocumentsFilter';
import IListOverdueDocumentsFilter from '@modules/documents/dtos/IListOverdueDocumentsFilter';
import IUpdateDocumentDTO from '@modules/documents/dtos/IUpdateDocumentDTO';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, LessThan, Repository, UpdateResult } from 'typeorm';
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

	public async update(
		dto: IUpdateDocumentDTO,
	): Promise<Document | undefined> {
		const { id, properties } = dto;

		await this.ormRepository.update(id, properties);

		return await this.ormRepository.findOne({ where: { id } });
	}

	public async findById(id: string): Promise<Document | undefined> {
		return await this.ormRepository.findOne({
			where: {
				id,
			},
		});
	}

	public async list(
		filtersObject: IListDocumentsFilter,
	): Promise<Document[]> {
		const { user, filters } = filtersObject;
		return await this.ormRepository.find({
			where: {
				owner: {
					createdBy: {
						id: user.id,
					},
				},
				...filters,
			},
			relations: ['owner'],
		});
	}

	public async listByClient(client: Client): Promise<Document[]> {
		return await this.ormRepository.find({
			where: {
				owner: client,
			},
		});
	}

	public async listOverdue(
		filters: IListOverdueDocumentsFilter,
	): Promise<Document[]> {
		const { user, date } = filters;

		return await this.ormRepository.find({
			where: {
				owner: {
					createdBy: {
						id: user.id,
					},
				},
				dueDate: LessThan(date),
				paid: false,
			},
			relations: ['owner'],
		});
	}

	public async listUnpaid(user: User): Promise<Document[]> {
		return await this.ormRepository.find({
			where: {
				owner: {
					createdBy: {
						id: user.id,
					},
				},
				paid: false,
			},
			relations: ['owner'],
		});
	}
}
