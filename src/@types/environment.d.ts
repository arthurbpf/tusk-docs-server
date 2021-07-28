/* eslint-disable no-unused-vars */
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN_SECRET: string;
		}
	}
}

export {};
