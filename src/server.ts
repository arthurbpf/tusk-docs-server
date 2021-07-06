import express from 'express';

const server = express();
const port = process.env.PORT || 3333;

server.get('/', (req, res) => res.send('Server online and ready!'));

server.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log('Server started!');
});
