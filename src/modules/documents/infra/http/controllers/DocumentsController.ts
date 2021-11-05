import { Request, Response, NextFunction } from 'express';
import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import AppError from '@shared/errors/AppError';

export default class DocumentsController {
	public async create(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		const { title, description, clientId } = request.body;

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
		const { ownerId } = request.query;

		if (!ownerId || typeof ownerId !== 'string') {
			throw new AppError('A owner id must be specified', 401);
		}

		// const service = new ListDocumentsByClientService();

		// const documents = await service.execute({
		// 	ownerId,
		// });

		return response.json(/*documents*/);
	}
}
