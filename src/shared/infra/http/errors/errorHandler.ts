/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

export default function (
	err: AppError,
	_request: Request,
	response: Response,
	_next: NextFunction,
): Response {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({ message: err.message });
	}

	return response.status(500).json({ message: 'Internal server error.' });
}
