// @ts-nocheck

import type { Command } from '#builders/Command';
import { Collection } from 'discord.js';
import { readdir } from 'fs';

const path: string = process.cwd() + '/dist/commands/';

export const _getCommands = async (): Promise<Collection<string, Command>> => {
    const cmds: Collection<string, Command> = new Collection();

    const commands = await new Promise((resolve, reject) =>
        readdir(path, (e, ls) =>
            e ? reject(e) : resolve(ls.map((i) => `${path}${i}/`))
        )
    )
        .then((ls) =>
            Promise.all(
                ls.map(
                    (path) =>
                        new Promise((resolve, reject) =>
                            readdir(path, (e, ls) =>
                                e
                                    ? reject(e)
                                    : resolve(ls.map((i) => `${path}${i}`))
                            )
                        )
                )
            ).then((lists) => lists.reduce((a, b) => [...a, ...b], []))
        )
        .then((list) => Promise.all(list.map((l) => import(l))));
    commands.forEach(({ command }) => cmds.set(command.name, command));

    return cmds;
};

const cats: string[] = [];

(() => {
    readdir(path, (e, ls) => {
        if (e) throw e;

        ls.forEach((i) => cats.push(i));
    });
})();

export const categories = cats;
export const commands = _getCommands();
