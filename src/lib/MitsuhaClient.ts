import type { Client } from 'discord.js';

export interface MitsuhaClient extends Client {
    name: string;
}

export const __MitsuhaClient__ = (client: Client): MitsuhaClient => {
    const _ = client as MitsuhaClient;

    _.name = 'Mitsuha';

    return _;
};
