import { UpdateResult } from 'typeorm';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Document from '../infra/typeorm/entities/Document';
import ICreateDocumentDTO from '../dtos/ICreateDocumentDTO';
import IListDocumentsFilter from '../dtos/IListDocumentsFilter';
import IListOverdueDocumentsFilter from '../dtos/IListOverdueDocumentsFilter';
import User from '@modules/users/infra/typeorm/entities/User';
import IUpdateDocumentDTO from '../dtos/IUpdateDocumentDTO';

export default interface IDocumentsRepository {
	create(dto: ICreateDocumentDTO): Promise<Document>;
	update(dto: IUpdateDocumentDTO): Promise<Document | undefined>;
	findById(id: string): Promise<Document | undefined>;
	list(filters: IListDocumentsFilter): Promise<Document[]>;
	listOverdue(filters: IListOverdueDocumentsFilter): Promise<Document[]>;
	listUnpaid(user: User): Promise<Document[]>;
	listByClient(client: Client): Promise<Document[]>;
}
