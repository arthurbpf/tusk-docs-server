/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import routes from '@shared/infra/http/routes';
import errorHandler from '@shared/infra/http/errors/errorHandler';
import { errors } from 'celebrate';

const main = async () => {
	dotenv.config();

	const server = express();
	const port = process.env.PORT || 3333;

	const connection = await createConnection();
	await connection.runMigrations();

	server.use(express.json());
	server.use(routes);
	server.use(errors());
	server.use(errorHandler);
	server.listen(port, () => {
		console.log('Server listening!');
	});
};

main().catch((error) => {
	console.log(error);
});
