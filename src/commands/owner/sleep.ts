import { MitsuhaClient } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';

export const command: Command = new Command(
    'sleep',
    {
        category: 'owner',
        ownerOnly: true,
        aliases: ['exit'],
    },
    (client: MitsuhaClient) => {
        const die = () => {
            client.destroy();
            process.exit(69);
        };
        return die();
    }
);
