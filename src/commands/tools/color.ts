import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed } from 'discord.js';
import { embedItem as item } from '#utils/MitsuhaEmbed';
import { colorDetector } from '#utils/colorDetector';
import { Command } from '#builders/Command';

export const command: Command = new Command(
    'color',
    {
        aliases: ['colour'],
        help: 'View a color.',
        usage: '[color name|hex|hsl|rgb]',
        category: 'tools',
    },
    (client: MitsuhaClient, message: Message, args: string[]) => {
        if (!args[0])
            return message.channel.send('Please input a valid color!');
        const color = colorDetector(args[0]);
        const c = args[0];

        if (!color)
            return message.channel.send(
                '`' + args[0] + '` is not a valid color.'
            );

        let hex: string;
        if (color.cType == 'hex') hex = c.replace('#', '');
        else hex = color.converted.hex.replace('#', '');

        const img = 'https://singlecolorimage.com/get/' + hex + '/300x170';
        const em: MessageEmbed = new MessageEmbed()
            .setColor('#' + hex)
            .setAuthor(c, img)
            .setDescription(
                item('Hex', `#${hex}`) +
                    item('RGB', color.converted.rgb.join(', ')) +
                    item('HSL', color.converted.hsl.join(', ')) +
                    item('Name', color.converted.name)
            )
            .setImage(img);

        return message.channel.send(em);
    }
);
