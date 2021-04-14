import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';
import files from '#utils/commandFileLoader';

export const command: Command = new Command(
    'source',
    {
        aliases: ['sauce', 'src'],
        help: "View source code of me or one of my command's.",
        category: 'misc',
        usage: 'source <null|command>',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        const em: MessageEmbed = new MessageEmbed().setAuthor(
            'Source',
            client.user.displayAvatarURL()
        );
        const commands = await client.commands;
        if (!args[0]) {
            em.setColor(client.config.colors.normal).setDescription(
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

            const file = files.get(cmd.name);
            em.setColor(client.config.colors.normal)
                .addField(
                    '\u200B',
                    `:file_folder:  __[/src/commands/${cmd.category}/${cmd.name}.ts](${client.config.repoURL}/blob/main/src/commands/${cmd.category}/${cmd.name}.ts)__`
                )
                .setDescription('`'.repeat(3) + 'ts\n' + file + '`'.repeat(3));

            return message.channel.send(em);
        }
    }
);
