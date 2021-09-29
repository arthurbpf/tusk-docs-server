import User from '@modules/users/infra/typeorm/entities/User';

/* eslint-disable no-unused-vars */
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN_SECRET: string;
		}
	}

	namespace Express {
		interface Request {
			user: User;
		}
	}
}

export {};
