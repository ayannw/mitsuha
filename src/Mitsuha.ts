import * as server from './server';
import * as logger from '#lib/logger';
import { __MitsuhaClient__, MitsuhaClient } from '#lib/MitsuhaClient';
import { execCommand } from '#lib/utils/commandRunner';
import { Client } from 'discord.js';
import { config } from 'dotenv';
import { readFile } from 'fs';

config();

const _client: Client = new Client();
const client: MitsuhaClient = __MitsuhaClient__(_client);
const token = process.env.DISCORD_TOKEN;

const start = () => {
    console.clear();
    readFile(process.cwd() + '/media/logo.txt', 'utf-8', (e, f): void => {
        if (e) return logger.error(String(e));
        console.log(f);
    });

    setTimeout((): void => {
        server.start(6969);
        client.login(token);
    }, 100);
};

client.once('ready', (): void => {
    logger.success('logged in as ' + client.user.tag);
});

client.on('message', async (message) => {
    return await execCommand(client, message);
});

start();
