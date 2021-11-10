import { Request, Response, NextFunction } from 'express';
import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import AppError from '@shared/errors/AppError';
import ListDocumentsService from '@modules/documents/services/ListDocumentsService';
import UpdateDocumentService from '@modules/documents/services/UpdateDocumentService';

export default class DocumentsController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { title, description, dueDate, value, clientId } = request.body;

		const file = request.file;

		if (!file) {
			throw new AppError('A file is needed for document creation', 400);
		}

		try {
			const service = new CreateDocumentService();

			const document = await service.execute({
				title,
				description,
				clientId,
				dueDate,
				value,
				fileBuffer: file.buffer,
				originalFileName: file.originalname,
			});

			return response.json(document);
		} catch (error) {
			next(error);
		}
	}

	public async listDocuments(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { ...filters } = request.params;
		const user = request.user;

		const service = new ListDocumentsService();

		const documents = await service.execute({ user, filters });

		return response.json(documents);
	}

	public async patchDocument(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { id } = request.params;
		const properties = request.body;

		const service = new UpdateDocumentService();

		try {
			const info = await service.execute({ id, properties });
			return response.json(info);
		} catch (error) {
			next(error);
		}
	}
}
