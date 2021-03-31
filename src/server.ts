import * as http from 'http';
import { success } from '#lib/logger';

export const start = (port: number): void => {
    //@ts-ignore
    const requestListener = (req, res) => {
        res.writeHead(200);
        res.end('online');
    };

    const server = http.createServer(requestListener);
    server.listen(port);
    success('server started: http://0.0.0.0:' + String(port) + '/');
};
