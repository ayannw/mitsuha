import express from 'express';
import { success } from '#lib/logger';

const app = express();

app.use(express.static(process.cwd() + '/website'));

export const start = (port: number): void => {
    app.listen(port, () => {
        success('server started: http://0.0.0.0:' + String(port) + '/');
    });
};
