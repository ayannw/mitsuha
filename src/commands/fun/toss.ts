import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';

const options = ['heads', 'tails'];

export const command: Command = new Command(
    'toss',
    {
        category: 'fun',
        aliases: ['coinflip'],
        help: 'Toss a coin.',
        usage: '[heads|tails]',
    },
    (client: MitsuhaClient, message: Message, args: string[]) => {
        const face = options[Math.floor(Math.random() * options.length)];
        const bet = args[0] || null;

        if (bet) {
            if (!options.includes(bet.toLowerCase())) {
                return message.channel.send(
                    '`' + bet + '` is not a valid coin face.'
                );
            }

            if (face === bet)
                return message.channel.send(
                    'The coin showed `' + face + '`, you won!'
                );
            else
                return message.channel.send(
                    'The coin showed `' + face + '`, you lost!'
                );
        }
        return message.channel.send('The coin showed `' + face + '`.');
    }
);
