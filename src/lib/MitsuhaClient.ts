import { commands } from './handlers/command';
import { DurationFormatter } from '@sapphire/time-utilities';
import { uptime } from 'os';
import { closest } from 'fastest-levenshtein';
import type { Client, Collection } from 'discord.js';
import type { Message as M } from 'discord.js';
import type { Command } from './builders/Command';
import * as conf from '../config';
import * as consts from '../constants';

const T = new DurationFormatter();

interface RawStr {
  raw: number;
  str: string;
}
interface MitsuhaStats {
  commands: number;
  users: number;
  guilds: string[];
  heapUsage: {
    total: RawStr;
    used: RawStr;
  };
  uptimes: {
    client: RawStr;
    host: RawStr;
  };
  ping: number;
}
export interface CommandSearchRes {
  res?: Command | null;
  closest?: string | undefined;
}

export interface MitsuhaClient extends Client {
  name: string;
  version: string;
  commands: Promise<Collection<string, Command>>;
  getCommand: (keyword: string) => Promise<CommandSearchRes>;
  stats: () => Promise<MitsuhaStats>;
  config: any;
  constants: any;
}

export const __MitsuhaClient__ = (client: Client): MitsuhaClient => {
  const _ = client as MitsuhaClient;

  _.name = 'Mitsuha';
  _.version = process.env.npm_package_version;
  _.commands = commands;
  _.getCommand = async (keyword: string): Promise<CommandSearchRes> => {
    const _cmds = await _.commands;
    const cmds = _cmds.map((c) => c.name);
    const re: CommandSearchRes = {
      res: _cmds.find(
        (c) => c.name == keyword || c.aliases.includes(keyword) || null
      ),
      closest: closest(keyword, cmds),
    };

    return re;
  };
  _.stats = async () => {
    const cmds = await _.commands;
    const stats: MitsuhaStats = {
      commands: cmds.size,
      users: client.guilds.cache.reduce(
        (acc, val) => acc + (val.memberCount || 0),
        0
      ),
      guilds: client.guilds.cache.map((g) => g.name),
      heapUsage: {
        total: {
          raw: process.memoryUsage().heapTotal,
          str:
            String(process.memoryUsage().heapTotal / 1048576).substring(0, 4) +
            'mb',
        },
        used: {
          raw: process.memoryUsage().heapUsed,
          str:
            String(process.memoryUsage().heapUsed / 1048576).substring(0, 4) +
            'mb',
        },
      },
      uptimes: {
        client: {
          raw: _.uptime,
          str: T.format(_.uptime),
        },
        host: {
          raw: uptime(),
          str: T.format(uptime() * 1000),
        },
      },
      ping: _.ws.ping,
    };
    return stats;
  };
  _.config = conf;
  _.constants = consts;

  return _;
};
export type Message = M;
