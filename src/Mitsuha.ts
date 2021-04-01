import * as server from './server';
import * as logger from '#lib/logger';
import { __MitsuhaClient__, MitsuhaClient } from '#lib/MitsuhaClient';
import { execCommand } from '#lib/utils/commandRunner';
import { Client } from 'discord.js';
import { config } from 'dotenv';
import { readFile } from 'fs';
import { Stopwatch } from '@sapphire/stopwatch';

config();

const _client: Client = new Client();
const client: MitsuhaClient = __MitsuhaClient__(_client);
const token = process.env.DISCORD_TOKEN;
const sw = new Stopwatch();

const start = () => {
    console.clear();
    logger.warn('starting ...');
    readFile(process.cwd() + '/media/logo.txt', 'utf-8', (e, f): void => {
        if (e) return logger.error(String(e));
        f.split('\n').forEach((l) => logger.info(l));
    });

    setTimeout((): void => {
        server.start(6969);
        sw.start();
        client.login(token);
    }, 100);
};

client.once('ready', (): void => {
    logger.success('logged in as ' + client.user.tag);
    const t = sw.stop().toString();
    logger.info('took ' + t + ' to login');
});

client.on('message', async (message) => {
    return await execCommand(client, message);
});

start();
