import * as server from './server';
import * as logger from '#lib/logger';
import { readFile } from 'fs';

const start = () => {
	readFile(process.cwd() + '/media/logo.txt', 'utf-8', (e, f): void=> {
		if(e) return logger.error(String(e));
		console.log(f)
	});

	setTimeout((): void => {
		server.start(6969);
	}, 10);
}

start()
