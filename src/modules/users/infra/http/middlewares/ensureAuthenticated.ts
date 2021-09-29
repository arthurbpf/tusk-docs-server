import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

interface TokenPayload {
	iat: number;
	exo: number;
	sub: string;
}

export default async function ensureAuthentication(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token is missing', 401);
	}

	const [, token] = authHeader.split(' ');

	const { secret } = authConfig.jwt;

	try {
		const decoded = verify(token, secret);

		const { sub } = decoded as TokenPayload;

		const repository = new UsersRepository();

		const user = await repository.findById(sub);

		if (!user) {
			throw new AppError('User not found', 401);
		}

		request.user = user;

		return next();
	} catch {
		throw new AppError('Invalid JWT token', 401);
	}
}
