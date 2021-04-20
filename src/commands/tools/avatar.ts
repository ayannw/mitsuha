import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed } from 'discord.js';
import { Command } from '#builders/Command';
import findUser from '#utils/userFinder';

export const command: Command = new Command(
    'avatar',
    {
        category: 'tools',
        help: 'View someone\'s avatar in full size.',
        aliases: ['a', 'av', 'pfp'],
        usage: '[@mention|tag|username]',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        const user = await findUser(client, message, args);
        if (!user)
            return message.channel.send(
                'User `' + args.join(' ') + '` not found.'
            );

        const url =
            user.displayAvatarURL({
                dynamic: true,
            }) + '?size=2048';
        const em: MessageEmbed = new MessageEmbed()
            .setAuthor(user.tag, url)
            .setImage(url)
            .setColor(client.config.colors.normal)
            .setTimestamp();

        return message.channel.send(em);
    }
);
