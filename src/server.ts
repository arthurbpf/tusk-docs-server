/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

const main = async () => {
	dotenv.config();

	const server = express();
	const port = process.env.PORT || 3333;

	const connection = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
	});

	await connection.runMigrations();

	server.listen(port, () => {
		console.log('Server listening!');
	});
};

main().catch((error) => {
	console.log(error);
});
