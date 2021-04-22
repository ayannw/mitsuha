import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';
import { codeBlock } from '@sapphire/utilities';
import files from '#utils/commandFileLoader';

export const command: Command = new Command(
    'source',
    {
        aliases: ['sauce', 'src'],
        help: "View source code of me or one of my command's.",
        category: 'bot',
        usage: 'source <null|command>',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        const em: MessageEmbed = new MessageEmbed()
            .setAuthor('Source', client.user.displayAvatarURL())
            .setColor(client.config.colors.normal);
        const commands = await client.commands;
        if (!args[0]) {
            em.setColor(client.constants.COLORS.normal).setDescription(
                '> You can view my source code here: \n' + client.config.repoURL
            );

            return message.channel.send(em);
        }
        if (args[0]) {
            const cmd: Command | null =
                commands.find(
                    (c) => c.name === args[0] || c.aliases.includes(args[0])
                ) || null;

            if (!cmd)
                return message.channel.send(
                    'Unable to find command `' + args[0] + '`.'
                );

            const file: string = files.get(cmd.name);

            if (file.length > 2048) {
                em.setDescription(
                    '> File is too long to send !\n' +
                        `:file_folder: __[/src/commands/${cmd.category}/${cmd.name}.ts](${client.config.repoURL}/blob/main/src/commands/${cmd.category}/${cmd.name}.ts)__`
                );

                return message.channel.send(em);
            }

            em.addField(
                client.constants.ZERO_WIDTH_SPACE,
                `:file_folder:  __[/src/commands/${cmd.category}/${cmd.name}.ts](${client.config.repoURL}/blob/main/src/commands/${cmd.category}/${cmd.name}.ts)__`
            ).setDescription(codeBlock('ts', file));

            return message.channel.send(em);
        }
    }
);
