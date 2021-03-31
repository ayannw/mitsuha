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
    ownerOnly?: boolean;
}

export interface Command extends CommandOptions {
    name: string;
    exec: Exec;
}

export class Command implements Command {
    public name: string;
    public exec: Exec;
    public aliases: string[];
    public help: string;
    public category: string;
    public permissions: string[];
    public ownerOnly: boolean;

    public constructor(name: string, opts: CommandOptions, exec: Exec) {
        this.name = name;
        this.exec = exec;
        this.aliases = opts.aliases || [];
        this.help = opts.help || '*Description unavailable.*';
        this.category = opts.category || 'Uncategorized';
        this.permissions = opts.permissions || [];
        this.ownerOnly = opts.ownerOnly || false;
    }
}
