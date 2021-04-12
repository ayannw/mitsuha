import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed, version } from 'discord.js';
import { Stopwatch } from '@sapphire/stopwatch';
import { Command } from '#builders/Command';
import { inspect } from 'util';

export const command: Command = new Command(
    'eval',
    {
        aliases: ['ev'],
        category: 'owner',
        ownerOnly: true,
        usage: 'eval [code]',
    },
    (client: MitsuhaClient, message: Message) => {
        const code = message.content.substr(message.content.indexOf(' ') + 1);
        const sw = new Stopwatch();
        const em: MessageEmbed = new MessageEmbed();
        let output: any;

        if (code.trim() == message.content) {
            return message.channel.send('I need some code to evaluate ...');
        }

        sw.start();
        try {
            output = inspect(eval(code));
            em.setColor(client.config.colors.success);
        } catch (err) {
            output = err;
            em.setColor(client.config.colors.error);
        }
        if (output.length > 2047)
            return message.channel.send('Output too long.');

        const time = sw.stop().toString();

        em.setAuthor(
            'Eval',
            message.author.displayAvatarURL({
                dynamic: true,
            })
        )
            .setDescription(
                '`'.repeat(3) +
                    'ts\n' +
                    'Node.js version      : ' +
                    process.version +
                    '\nDiscord.js version   : v' +
                    version +
                    '`'.repeat(3) +
                    '\n\n' +
                    '`'.repeat(3) +
                    'ts\n' +
                    String(output) +
                    '`'.repeat(3)
            )
            .setFooter(`Done in ${time}`, client.user.displayAvatarURL());

        return message.channel.send(em);
    }
);
