/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

export default function (
	err: AppError,
	_request: Request,
	response: Response,
	_next: NextFunction,
): void {
	response.status(err.statusCode).json({ error: err.message });
}
