/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import usersRouter from './modules/users/infra/http/routers/user.routes';

const main = async () => {
	dotenv.config();

	const server = express();
	const port = process.env.PORT || 3333;

	const connection = await createConnection();
	await connection.runMigrations();

	server.use(express.json());
	server.use('/users', usersRouter);
	server.listen(port, () => {
		console.log('Server listening!');
	});
};

main().catch((error) => {
	console.log(error);
});
