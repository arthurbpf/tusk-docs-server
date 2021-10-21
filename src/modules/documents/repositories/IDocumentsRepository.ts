import Client from '@modules/clients/infra/typeorm/entities/Client';
import Document from '../infra/typeorm/entities/Document';
import ICreateDocumentDTO from '../dtos/ICreateDocumentDTO';

export default interface IDocumentsRepository {
	create(dto: ICreateDocumentDTO): Promise<Document>;
	findById(id: string): Promise<Document | undefined>;
	findByClient(client: Client): Promise<Document[]>;
}
