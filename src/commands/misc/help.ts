import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';

export const command: Command = new Command(
    'help',
    {
        category: 'misc',
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
            const cmd: Command | null =
                commands.find(
                    (c) => c.name === args[0] || c.aliases.includes(args[0])
                ) || null;

            if (!cmd)
                return message.channel.send(
                    'Unable to find command `' + args[0] + '`.'
                );
        }

        commands.forEach((cmd) => {
            list += '❯ **' + cmd.name + '**: ' + cmd.help + '\n';
        });

        em.setDescription(list);
        list = '';

        return message.channel.send(em);
    }
);
