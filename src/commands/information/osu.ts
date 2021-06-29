import osu from 'node-osu';
import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';
import { embedItem as item } from '#utils/MitsuhaEmbed';
import { MessageEmbed } from 'discord.js';
import { DurationFormatter } from '@sapphire/time-utilities';
import { Stopwatch } from '@sapphire/stopwatch';

const T = new DurationFormatter();
const Api = new osu.Api(process.env.OSU_API_KEY, {
  notFoundAsError: true,
});

export const command = new Command(
  'osu',
  {
    help: 'Fetch Osu! player information.',
    usage: '[Osu! username]',
    category: 'information',
  },
  async (client: MitsuhaClient, message: Message, args: string[]) => {
    if (!args[0]) return message.channel.send('Please provide a username.');

    const sw = new Stopwatch();
    const uname = args[0];
    sw.start();
    const user = await Api.getUser({ u: uname });
    const time = sw.stop().toString();

    // @ts-ignore
    if (user == [])
      return message.channel.send('User `' + uname + '` not found.');

    const em = new MessageEmbed()
      .setAuthor(user.name, 'https://a.ppy.sh/' + user.id)
      .setThumbnail('https://a.ppy.sh/' + user.id)
      .setDescription(
        item('ID', user.id) +
          item('Total plays', user.counts.plays) +
          item('Time played', T.format(user.secondsPlayed * 1000)) +
          item('300', user.counts['300']) +
          item('100', user.counts['100']) +
          item('50', user.counts['50']) +
          item('A', user.counts.A) +
          item('S', user.counts.S) +
          item('SH', user.counts.SH) +
          item('SS', user.counts.SS) +
          item('SSH', user.counts.SSH) +
          item('Total score', user.scores.total) +
          item('Ranked score', user.scores.ranked) +
          item('Level', String(user.level).substr(0, 5)) +
          item('Accuracy', String(user.accuracy).substr(0, 5)) +
          item('Global rank', Number(user.pp.rank)) +
          item('Country rank', Number(user.pp.countryRank)) +
          '\n[Visit profile](https://osu.ppy.sh/users/' +
          user.id +
          ')'
      )
      .setColor('#EF6DA8')
      .setFooter(
        'osu.ppy.sh | ' + time,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Osu%21Logo_%282015%29.png/600px-Osu%21Logo_%282015%29.png'
      );

    return message.channel.send(em);
  }
);
