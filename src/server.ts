/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import swaggerConfig from '@config/openapi.json';
import { createConnection } from 'typeorm';

import routes from '@shared/infra/http/routes';
import errorHandler from '@shared/infra/http/errors/errorHandler';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const main = async () => {
	dotenv.config();

	const server = express();
	const port = process.env.PORT || 3333;

	const postgresConnectionInfo: PostgresConnectionOptions = {
		type: 'postgres',
		migrations: [
			join(
				__dirname,
				'shared',
				'infra',
				'typeorm',
				'migrations',
				'*.{ts,js}',
			),
		],
		entities: [join(__dirname, '**', 'typeorm', 'entities', '*.{ts,js}')],
		cli: {
			migrationsDir: join(
				__dirname,
				'shared',
				'infra',
				'typeorm',
				'migrations',
			),
		},
	};

	if (process.env.DATABASE_URL) {
		Object.assign(postgresConnectionInfo, {
			url: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		});
	} else {
		Object.assign(postgresConnectionInfo, {
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'docker',
			database: 'tuskdocs',
		});
	}

	const connection = await createConnection(postgresConnectionInfo);

	await connection.runMigrations();

	server.use(express.json());
	server.use(routes);
	server.use(
		'/',
		swaggerUi.serve,
		swaggerUi.setup(swaggerConfig, { explorer: true }),
	);
	server.use(errorHandler);
	server.listen(port, () => {
		console.log('Server listening!');
	});
};

main().catch((error) => {
	console.log(error);
});
