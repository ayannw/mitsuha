import type { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { error, msgLog } from '#lib/logger';

const execMessage = (client: MitsuhaClient, message: Message) => {
  msgLog(message);
  const ctx = message.content.trim();

  let swp = false;
  let args: string[] = [];
  let cmd = '';

  if (
    ctx.startsWith(client.config.prefix) ||
    ctx.toLowerCase().startsWith(client.config.prefix)
  )
    swp = true;

  if (swp) {
    args = ctx.replace(client.config.prefix, '').trim().split(/ +/);

    cmd = args[0].toLowerCase();
    args = args.join(' ').replace(cmd, '').split(' ');
    args.shift();
  }

  return {
    swp: swp,
    cmd: cmd,
    args: args,
  };
};

export const execCommand = async (client: MitsuhaClient, message: Message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(`<@${client.user.id}>`)) {
    return message.channel.send(
      `Prefix for this guild is set to \`${client.config.prefix}\`.`
    );
  }

  const res = execMessage(client, message);

  if (!res.swp) return;

  const _c = await client.getCommand(res.cmd);
  const command = _c.res;

  if (!command) return;
  try {
    if (command.nsfw) {
      return message.channel.send(
        'Can not execute NSFW commands in this channel!'
      );
    }
    if (command.ownerOnly) {
      const isOwner = new Set(client.config.owners).has(message.author.id);
      if (!isOwner) return message.channel.send("You don't own me.");
      if (isOwner) return command.exec(client, message, res.args);
    }

    return command.exec(client, message, res.args);
  } catch (e) {
    message.channel.send(
      'Failed to execute command ' +
        `\`${command.name}\`, reason:\n` +
        '`'.repeat(3) +
        'ts\n' +
        e +
        '`'.repeat(3)
    );
    return error('failed to execute command ' + command.name + ' : ' + e);
  }
};
