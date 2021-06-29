// @ts-nocheck

import type { MitsuhaClient, Message } from '../MitsuhaClient';
import type { User, GuildMember } from 'discord.js';

const findUser = async (
  client: MitsuhaClient,
  message: Message,
  args: string[]
): Promise<User> | User => {
  if (!args[0]) return message.author;
  if (message.mentions.users.size > 0) return message.mentions.users.first();

  const name = args.join(' ').toLowerCase();
  let user: User | null;
  let member: GuildMember | null;

  try {
    user = (await client.users.fetch(name)) || null;
  } catch {
    member =
      message.guild.members.cache.find(
        (m) =>
          m.user.id === name ||
          m.user.username.toLowerCase() === name ||
          m.user.tag.toLowerCase() === name ||
          m.displayName.toLowerCase() === name ||
          m.displayName.toLowerCase().startsWith(name) ||
          m.user.username.toLowerCase().startsWith(name) ||
          m.displayName.toLowerCase().endsWith(name) ||
          m.user.username.toLowerCase().endsWith(name)
      ) || null;
  }

  if (!member && !user) {
    return null;
  }

  if (member) user = member.user;

  return user;
};

export default findUser;
