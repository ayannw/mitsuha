import fetch from 'node-fetch';
import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { codeBlock } from '@sapphire/utilities';
import { Command } from '#builders/Command';

const url = 'https://trace.moe/api/search?url=';

export const command: Command = new Command(
    'detect-anime',
    {
        usage: '[attachment:animeScreenshot]',
        help: 'Detect the anime by attachment.',
        category: 'anime',
    },
    async (client: MitsuhaClient, message: Message) => {
        if (!message.attachments.first())
            return message.channel.send(
                'Missing attachment: `[attachment:animeScreenshot]`.'
            );

        const img = message.attachments.first().url;
        let res: any;

        try {
            res = await fetch(url + img);
        } catch (err) {
            return message.channel.send(
                'An error occured while trying to execute this command!\n' +
                    codeBlock('ts', err)
            );
        }

        res = await res.json();

        let anime;

        try {
            anime = res.docs[0];
        } catch {
            return message.channel.send(String(res) + '.');
        }

        return message.channel.send(
            'Anime: `' +
                anime.title_english +
                '`, episode: `' +
                String(anime.episode) +
                '`.'
        );
    }
);
