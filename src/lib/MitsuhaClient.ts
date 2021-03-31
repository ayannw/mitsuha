import type { Client } from 'discord.js';
import type { Message as M } from 'discord.js';

export interface MitsuhaClient extends Client {
    name: string;
}

export const __MitsuhaClient__ = (client: Client): MitsuhaClient => {
    const _ = client as MitsuhaClient;

    _.name = 'Mitsuha';

    return _;
};
export type Message = M;
