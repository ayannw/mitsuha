import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { Command } from '#builders/Command';

export const command: Command = new Command(
    '',
    {
        category: '',
    },
    (client: MitsuhaClient, message: Message, args: string[]) => {}
);
