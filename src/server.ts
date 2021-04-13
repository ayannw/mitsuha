import express from 'express';
import { success, error } from '#lib/logger';

const app = express();

try {
    app.use(express.static(process.cwd() + '/website'));
} catch (e) {
    error(e);
}

export const start = (port: number): void => {
    app.listen(port, () => {
        success('server started: http://0.0.0.0:' + String(port) + '/');
    });
};
