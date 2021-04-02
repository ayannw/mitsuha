import type { MitsuhaClient, Message } from '../MitsuhaClient';

interface Exec {
    (client: MitsuhaClient, message: Message, args?: string[]):
        | Promise<void | Message>
        | Message
        | void
        | undefined;
}
interface CommandOptions {
    aliases?: string[];
    help?: string;
    category?: string;
    permissions?: string[];
    permissionError?: string;
    ownerOnly?: boolean;
}

export interface Command extends CommandOptions {
    __type: string;
    name: string;
    exec: Exec;
}

export class Command implements Command {
    public __type: string;
    public name: string;
    public exec: Exec;
    public aliases: string[];
    public help: string;
    public category: string;
    public permissions: string[];
    public permissionError: string;
    public ownerOnly: boolean;

    public constructor(name: string, opts: CommandOptions, exec: Exec) {
        this.__type = 'Command';
        this.name = name;
        this.exec = exec;
        this.help = opts.help || '*Description unavailable.*';
        this.category = opts.category || 'Uncategorized';

        opts.aliases ? (this.aliases = opts.aliases) : null;
        opts.permissions ? (this.permissions = opts.permissions) : null;
        opts.permissionError? (this.permissionError = opts.permissionError) : null;
        opts.ownerOnly ? (this.ownerOnly = true) : null;
    }
}
