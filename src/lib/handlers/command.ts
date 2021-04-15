// @ts-nocheck

import type { Command } from '#builders/Command';
import { Collection } from 'discord.js';
import { readdir } from 'fs';

const path: string = process.cwd() + '/dist/commands/';

const getCommands = async (): Promise<Collection<string, Command>> => {
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

const categories_ = async () => {
    const cmds = await getCommands();
    const infolist: any[] = [];
    const map: Map<string, { name: string; cmds: string[] }> = new Map();

    cmds.forEach((cmd) =>
        infolist.push({
            name: cmd.name,
            cat: cmd.category,
        })
    );

    infolist.forEach((item) => map.set(item.cat, { name: item.cat, cmds: [] }));
    infolist.forEach((item) => {
        map.get(item.cat).cmds.push('`' + item.name + '`');
    });

    return map;
};

export const categories = categories_();
export const commands = getCommands();
