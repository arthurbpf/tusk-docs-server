import Client from '@modules/clients/infra/typeorm/entities/Client';
import Document from '../infra/typeorm/entities/Document';
import ICreateDocumentDTO from '../dtos/ICreateDocumentDTO';
import IFilter from '@shared/dtos/IFilter';

export default interface IDocumentsRepository {
	create(dto: ICreateDocumentDTO): Promise<Document>;
	findById(id: string): Promise<Document | undefined>;
	list(filters: IFilter[]): Promise<Document[]>;
	listByClient(client: Client): Promise<Document[]>;
}
