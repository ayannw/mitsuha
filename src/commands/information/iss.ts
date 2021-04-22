import fetch from 'node-fetch';
import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed } from 'discord.js';
import { embedItem } from '#utils/MitsuhaEmbed';
import { Command } from '#builders/Command';

const url = 'http://api.open-notify.org/iss-now.json';
const img =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/800px-International_Space_Station_after_undocking_of_STS-132.jpg';

export const command: Command = new Command(
    'iss',
    {
        aliases: ['iss-now', 'space-station'],
        category: 'information',
        help: 'Know the current location of the international space station.',
    },
    async (client: MitsuhaClient, message: Message) => {
        let res: any;
        let data: any;

        try {
            res = await fetch(url);
            data = await res.json();
        } catch (err) {
            res = null;
            data = err;
        }

        if (!res) {
            return message.channel.send(
                'An error occured while executing this command!' +
                    '`'.repeat(3) +
                    'ts\n' +
                    data +
                    '`'.repeat(3)
            );
        }

        const pos = data.iss_position;
        const em: MessageEmbed = new MessageEmbed()
            .setAuthor('International Space Station', img)
            .setDescription(
                embedItem('Latitude', pos.latitude) +
                    embedItem('Longitude', pos.longitude)
            )
            .setThumbnail(img)
            .setColor(client.constants.COLORS.normal);

        return message.channel.send(em);
    }
);
