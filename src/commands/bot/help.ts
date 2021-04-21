import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';
import { embedItem as item } from '#utils/MitsuhaEmbed';
import { categories as cats } from '#handlers/command';
import { codeBlock } from '@sapphire/utilities';

const up1 = (s: string) => {
    return s.replace(s[0], s[0].toUpperCase());
};

export const command: Command = new Command(
    'help',
    {
        category: 'bot',
        aliases: ['cmds', 'cmdlist', 'commands'],
        help: 'A list of my commands or the description of one.',
        usage: '<command>',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
             const em: MessageEmbed = new MessageEmbed()
            .setAuthor('Displaying help', client.user.displayAvatarURL())
            .setColor(client.config.colors.normal)
            .setFooter(
                message.author.tag,
                message.author.displayAvatarURL({
                    dynamic: true,
                })
            )
            .setTimestamp();

        if (args[0]) {
            const _cmd = await client.getCommand(args[0]);

            if (!_cmd.res && _cmd.closest)
                return message.channel.send(
                    'Unknown command `' +
                        args[0] +
                        '`, did you mean `' +
                        _cmd.closest +
                        '` ?'
                );

            const cmd = _cmd.res;
            let des: string =
                item('Name', cmd.name) +
                item('Category', cmd.category) +
                '> ' +
                cmd.help +
                '\n';

            if (cmd.aliases[0])
                des += item('Aliases', '`' + cmd.aliases.join(', ') + '`');

            des += item('Usage', codeBlock('bash', cmd.usage));

            em.setDescription(des);
            return message.channel.send(em);
        }

        const categories = await cats;

        categories.forEach((cat) => {
            em.addField(
                '❯❯ **' + up1(cat.name) + '**\n',
                '> ' + cat.cmds.join(' | ') + '\n'
            );
        });

        em.setDescription(
            `> Prefix for this guild is set to \`${client.config.prefix}\`, type \`${client.config.prefix}help <command>\` to get explanation of a specific command.\n`
        );
        return message.channel.send(em);
    }
);
