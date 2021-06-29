import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { version } from 'discord.js';
import { Stopwatch } from '@sapphire/stopwatch';
import { Command } from '#builders/Command';
import { inspect } from 'util';

export const command: Command = new Command(
  'eval',
  {
    aliases: ['ev', 'e'],
    category: 'owner',
    ownerOnly: true,
    usage: 'eval [code]',
  },
  (client: MitsuhaClient, message: Message) => {
    const code = message.content.substr(message.content.indexOf(' ') + 1);
    const sw = new Stopwatch();
    let output: any;
    let err = false;
    let emoji: string;
    let type: string;

    if (code.trim() == message.content) {
      return message.channel.send('Missing argument: [code]');
    }

    sw.start();
    try {
      output = eval(code);
    } catch (error) {
      output = error;
      err = true;
    }

    if (err) {
      emoji = client.constants.EMOJIS.redCross;
      type = 'error';
    } else {
      emoji = client.constants.EMOJIS.greenTick;
      type = typeof output;
    }

    const time = sw.stop().toString();
    output = inspect(output);

    if (output.length > 1900) return message.channel.send('Output too long.');

    let m: string =
      '**Output**:\n' + '`'.repeat(3) + 'ts\n' + String(output) + '`'.repeat(3);

    m += `\n\n${emoji} Node: \`${process.version}\` | Discord.js: \`v${version}\` | \`${time}\` | \`${type}\``;

    return message.channel.send(m);
  }
);
