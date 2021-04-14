import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';
import { embedItem as item } from '#utils/MitsuhaEmbed';

export const command: Command = new Command(
    'help',
    {
        category: 'bot',
        aliases: ['cmds', 'cmdlist', 'commands'],
        help: 'A list of my commands or the description of one.',
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
            const cmd = await client.getCommand(args[0]);

            if (!cmd.res && cmd.closest)
                return message.channel.send(
                    'Unknown command `' +
                        args[0] +
                        '`, did you mean `' +
                        cmd.closest +
                        '` ?'
                );

            if (!cmd.res && !cmd.closest)
                return message.channel.send(
                    'Unknown command `' + args[0] + '`'
                );
        }

        commands.forEach((cmd) => {
            list += item(cmd.name, cmd.help);
        });

        em.setDescription(list);
        list = '';

        return message.channel.send(em);
    }
);
