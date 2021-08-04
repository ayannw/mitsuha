import fetch from 'node-fetch';
import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { codeBlock } from '@sapphire/utilities';
import { Command } from '#builders/Command';
import { MessageEmbed } from 'discord.js';
import { DurationFormatter } from '@sapphire/time-utilities';
import { Stopwatch } from '@sapphire/stopwatch';

const url = 'https://api.trace.moe/search?url=';
const D = new DurationFormatter();

export const command: Command = new Command(
  'detect-anime',
  {
    usage: '[attachment:animeScreenshot]',
    aliases: ['sauce'],
    help: 'Detect the anime by attachment.',
    category: 'anime',
  },
  async (client: MitsuhaClient, message: Message) => {
    if (!message.attachments.first())
      return message.channel.send(
        'Missing attachment: `[attachment:animeScreenshot]`.'
      );
    const sw = new Stopwatch();
    const img = message.attachments.first().url;
    let res: any;
    let time: string;

    try {
      sw.start();
      res = await fetch(url + img + '&anilistInfo');
      time = sw.stop().toString();
    } catch (err) {
      return message.channel.send(
        'An error occured while trying to execute this command!\n' +
          codeBlock('ts', err)
      );
    }

    res = await res.json();

    let anime;

    try {
      anime = res.result[0];
    } catch {
      return message.channel.send(String(res) + '.');
    }

    if (anime.error) {
      return message.channel.send(
        'Error response recieved from api.trace.moe: `' + anime.error + '`.'
      );
    }

    const info = anime.anilist;
    let description = `**${
      info.title.english || info.title.romaji || info.title.native
    }**, `;

    !anime.episode
      ? (description += `at \`${D.format(anime.from * 1000)}\`.`)
      : (description += `episode: \`${anime.episode}\` at \`${D.format(
          anime.from * 1000
        )}.`);

    const em = new MessageEmbed()
      .setColor(client.constants.COLORS.normal)
      .setDescription(
        description +
          `\n\n[Anilist](https://anilist.co/anime/${info.id}) | [MAL](https://myanimelist.net/anime/${info.idMal})`
      )
      .setFooter(
        'trace.moe | ' + time,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj3kJWxdku5FNj2aNqxrVz8jgyHZlai0UzC0dQZHyMKvtsupUUZwskRbY&s=10'
      );

    return message.channel.send(em);
  }
);
