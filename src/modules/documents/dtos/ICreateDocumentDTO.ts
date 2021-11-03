import Client from '@modules/clients/infra/typeorm/entities/Client';

export default interface ICreateClientDTO {
	title: string;
	description: string;
	owner: Client;
	fileUrl: string;
	originalFileName: string;
}
