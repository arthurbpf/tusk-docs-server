import Document from '@modules/documents/infra/typeorm/entities/Document';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export default interface IUpdateDocumentDTO {
	id: string;
	properties: QueryDeepPartialEntity<Document>;
}
