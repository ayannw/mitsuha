import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed } from 'discord.js';
import { quotedEmbedItem as item } from '#utils/MitsuhaEmbed';
import { Command } from '#builders/Command';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import findUser from '#utils/userFinder';

dayjs.extend(localizedFormat);

export const command: Command = new Command(
    'whois',
    {
        aliases: ['userinfo', 'user', 'u'],
        usage: '[ID|@mention|tag|username]',
        category: 'tools',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        const user = await findUser(client, message, args);
        if (!user)
            return message.channel.send(
                'User `' + args.join(' ') + '` not found.'
            );

        const av = user.displayAvatarURL({
            dynamic: true,
        });
        const creationDate = dayjs(user.createdTimestamp).format('LLLL');
        const em = new MessageEmbed()
            .setColor(client.constants.COLORS.normal)
            .setAuthor(user.tag, av)
            .setDescription(
                ' ' +
                    client.constants.DOT +
                    ' **User information**\n' +
                    item('Username', user.username) +
                    item('Discriminator', user.discriminator) +
                    item('ID', user.id) +
                    item('Created at', creationDate) +
                    '\n'
            )
            .setThumbnail(av)
            .setTimestamp();

        return message.channel.send(em);
    }
);
