import { commands } from './handlers/command';
import type { Client, Collection } from 'discord.js';
import type { Message as M } from 'discord.js';
import type { Command } from './builders/Command';
import * as conf from '../config';

export interface MitsuhaClient extends Client {
    name: string;
    commands: Promise<Collection<string, Command>>;
    config: any;
}

export const __MitsuhaClient__ = (client: Client): MitsuhaClient => {
    const _ = client as MitsuhaClient;

    _.name = 'Mitsuha';
    _.commands = commands;
    _.config = conf;

    return _;
};
export type Message = M;
