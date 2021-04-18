import fetch from 'node-fetch';
import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed } from 'discord.js';
import { Stopwatch } from '@sapphire/stopwatch';
import { codeBlock } from '@sapphire/utilities';
import { embedItem } from '#utils/MitsuhaEmbed';
import { DurationFormatter } from '@sapphire/time-utilities';
import { Command } from '#builders/Command';

const baseurl = 'https://kitsu.io/api/edge/anime?filter[text]=';
const kitsuLogo = 'https://avatars1.githubusercontent.com/u/7648832?s=200&v=4';
const T = new DurationFormatter();

export const command: Command = new Command(
    'anime',
    {
        aliases: ['animu'],
        help: 'Search kitsu.io for an anime.',
        usage: '[animeName]',
        category: 'anime',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        if (!args[0])
            return message.channel.send('Missing argument: `[animeName]`');

        const sw = new Stopwatch();

        sw.start();

        const animeName = encodeURI(args.join(' '));
        let list: any;

        try {
            list = await fetch(baseurl + animeName);
            list = await list.json();
        } catch (err) {
            return message.channel.send(
                'An error occured while trying to execute this command!\n' +
                    codeBlock('ts', err)
            );
        }

        if (!list.data[0])
            return message.channel.send('Anime `' + animeName + '` not found.');

        const time = sw.stop().toString();
        const anime = list.data[0].attributes;

        const em: MessageEmbed = new MessageEmbed()
            .setTitle(
                anime.canonicalTitle ||
                    anime.titles.en ||
                    anime.titles.en_jp ||
                    anime.titles.ja_jp
            )
            .setURL('https://kitsu.io/anime/' + anime.slug)
            .setColor(client.config.colors.normal)
            .setDescription(
                embedItem('English title', anime.titles.en || 'None') +
                    embedItem(
                        'Canonical title',
                        anime.canonicalTitle || 'None'
                    ) +
                    embedItem('Japanese title', anime.titles.ja_jp || 'None') +
                    embedItem('Popularity rank', anime.popularityRank) +
                    embedItem('Average rating', anime.averageRating) +
                    embedItem(
                        'Description',
                        anime.sypnosis || anime.description
                    ) +
                    embedItem('Episodes', anime.episodeCount) +
                    embedItem(
                        'Episode length',
                        T.format(anime.episodeLength * 60000)
                    ) +
                    embedItem('Age rating', anime.ageRating)
            )
            .setThumbnail(anime.posterImage.original)
            .setFooter('kitsu.io | ' + time, kitsuLogo);

        return message.channel.send(em);
    }
);
