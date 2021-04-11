import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';

export const command: Command = new Command(
    'ping',
    {
        aliases: ['pong', 'latency'],
        help: 'Check my latency and heartbeat.',
        category: 'misc',
    },
    (client: MitsuhaClient, message: Message) => {
        return message.channel.send('?').then((m) => {
            const ping = String(m.createdTimestamp - message.createdTimestamp);
            m.edit(
                'Pong! Latency: `' +
                    ping +
                    '`ms, heartbeat: `' +
                    String(client.ws.ping) +
                    '`ms'
            );
        });
    }
);
