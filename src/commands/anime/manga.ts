import fetch from 'node-fetch';
import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed } from 'discord.js';
import { Stopwatch } from '@sapphire/stopwatch';
import { codeBlock } from '@sapphire/utilities';
import { embedItem } from '#utils/MitsuhaEmbed';
import { Command } from '#builders/Command';

const baseurl = 'https://kitsu.io/api/edge/manga?filter[text]=';
const kitsuLogo = 'https://avatars1.githubusercontent.com/u/7648832?s=200&v=4';

export const command: Command = new Command(
    'manga',
    {
        help: 'Search kitsu.io for a manga.',
        usage: '[mangaName]',
        category: 'anime',
    },
    async (client: MitsuhaClient, message: Message, args: string[]) => {
        if (!args[0])
            return message.channel.send('Missing argument: `[mangaName]`.');

        const sw = new Stopwatch();

        sw.start();

        const mangaName = encodeURI(args.join(' '));
        let list: any;

        try {
            list = await fetch(baseurl + mangaName);
            list = await list.json();
        } catch (err) {
            return message.channel.send(
                'An error occured while trying to execute this command!\n' +
                    codeBlock('ts', err)
            );
        }

        if (!list.data[0])
            return message.channel.send('Manga `' + mangaName + '` not found.');

        const time = sw.stop().toString();
        const manga = list.data[0].attributes;

        const em: MessageEmbed = new MessageEmbed()
            .setTitle(
                manga.canonicalTitle ||
                    manga.titles.en ||
                    manga.titles.en_jp ||
                    manga.titles.ja_jp
            )
            .setURL('https://kitsu.io/manga/' + manga.slug)
            .setColor(client.config.colors.normal)
            .setDescription(
                embedItem('English title', manga.titles.en || 'None') +
                    embedItem(
                        'Canonical title',
                        manga.canonicalTitle || 'None'
                    ) +
                    embedItem('Japanese title', manga.titles.ja_jp || 'None') +
                    embedItem('Popularity rank', manga.popularityRank) +
                    embedItem('Average rating', manga.averageRating) +
                    embedItem(
                        'Description',
                        manga.sypnosis || manga.description
                    ) +
                    embedItem('Chapters', manga.chapterCount) +
                    embedItem('Volumes', manga.volumeCount) +
                    embedItem('Age rating', manga.ageRating)
            )
            .setThumbnail(manga.posterImage.original)
            .setFooter('kitsu.io | ' + time, kitsuLogo);

        return message.channel.send(em);
    }
);
