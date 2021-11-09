import { Request, Response, NextFunction } from 'express';
import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import AppError from '@shared/errors/AppError';
import ListDocumentsService from '@modules/documents/services/ListDocumentsService';

export default class DocumentsController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { title, description, dueDate, value, clientId } = request.body;

		const file = request.file;

		if (!file) {
			throw new AppError('A file is needed for document creation', 401);
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
}
