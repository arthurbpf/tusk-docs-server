import { Request, Response, NextFunction } from 'express';
import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import AppError from '@shared/errors/AppError';
import { readFileSync } from 'fs';
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

		const fileBuffer = readFileSync(file.path);

		const service = new CreateDocumentService();

		const document = await service.execute({
			title,
			description,
			clientId,
			fileBuffer,
			originalFileName: file.originalname,
		});

		return response.json(document);
	}
}
