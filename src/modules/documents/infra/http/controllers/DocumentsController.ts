import { Request, Response, NextFunction } from 'express';
import CreateDocumentService from '@modules/documents/services/CreateDocumentService';

export default class DocumentsController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { title, description, ownerId } = request.body;

		const service = new CreateDocumentService();

		const document = await service.execute({ title, description, ownerId });

		return response.json(document);
	}
}
