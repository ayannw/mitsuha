import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';
import { embedItem as item } from '#utils/MitsuhaEmbed';
import { categories as cats } from '#handlers/command';

export const command: Command = new Command(
    'help',
    {
        category: 'bot',
        aliases: ['cmds', 'cmdlist', 'commands'],
        help: 'A list of my commands or the description of one.',
        usage: '<command>',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        const commands = await client.commands;

        let list = '';
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
            let des: string = item('Name', cmd.name) + '> ' + cmd.help + '\n';

            if (cmd.aliases)
                des += item('Aliases', '`' + cmd.aliases.join(', ') + '`');

            des += item(
                'Usage',
                '`'.repeat(3) + 'sh\n' + cmd.usage + '`'.repeat(3)
            );

            em.setDescription(des);
            return message.channel.send(em);
        }

        commands.forEach((cmd) => {
            list += item(cmd.name, cmd.help);
        });

        em.setDescription(list);
        list = '';

        return message.channel.send(em);
    }
);
