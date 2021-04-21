import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';

export const command: Command = new Command(
    'sleep',
    {
        category: 'owner',
        ownerOnly: true,
        aliases: ['exit'],
    },
    (client: MitsuhaClient, message: Message, args: string[]) => {
		const die = () => {
			client.destroy();
			process.exit(69)
		}
    	return die();
    }
);
