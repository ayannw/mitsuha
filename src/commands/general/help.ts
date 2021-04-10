import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';

export const command: Command = new Command(
    'help',
    {
        category: 'general',
        aliases: ['cmds', 'cmdlist', 'commands'],
        help: 'A list of my commands.',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        //const c: string | null = args[0] || null;
        const commands = await client.commands;

        let list = '';
        let em: MessageEmbed = new MessageEmbed()
            .setAuthor('Displaying help', client.user.displayAvatarURL())
            .setColor(client.config.colors.normal)
            .setFooter(
                message.author.tag,
                message.author.displayAvatarURL({
                    dynamic: true,
                })
            )
            .setTimestamp();

        commands.forEach((cmd) => {
            list += '❯ **' + cmd.name + '**: ' + cmd.help + '\n';
        });

        em.setDescription(list)
        list = '';

        return message.channel.send(em);
    }
);
