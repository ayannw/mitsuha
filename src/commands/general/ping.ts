import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';

export const command: Command = new Command(
    'ping',
    {
        aliases: ['pong', 'latency'],
        help: 'Check my latency and heartbeat.',
        category: 'general',
    },
    (client: MitsuhaClient, message: Message) => {
        return message.channel.send('Pong!');
    }
);
