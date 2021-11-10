import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import GetUserInfoService from '@modules/users/services/GetUserInfoService';

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
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new AppError('JWT token is missing', 400);
		}

		const [, token] = authHeader.split(' ');

		const { secret } = authConfig.jwt;

		let decoded;
		try {
			decoded = verify(token, secret);
		} catch (error) {
			throw new AppError('Invalid token', 401);
		}

		const { sub } = decoded as TokenPayload;

		const getUserInfo = new GetUserInfoService();

		const user = await getUserInfo.execute(sub);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		request.user = user;

		return next();
	} catch (error) {
		next(error);
	}
}
