import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { embedItem as item } from '#utils/MitsuhaEmbed';
import { MessageEmbed, version as dV } from 'discord.js';
import { Command } from '#builders/Command';

export const command: Command = new Command(
    'stats',
    {
        aliases: ['statistics'],
        category: 'bot',
        help: 'View my statiscics.',
    },
    async (client: MitsuhaClient, message: Message) => {
        const stats = await client.stats();

        const em: MessageEmbed = new MessageEmbed()
            .setColor(client.config.colors.normal)
            .setAuthor(
                'Mitsuha v' + client.version,
                client.user.displayAvatarURL()
            )
            .setDescription(
                '• **Statistics**:\n' +
                    item('Users', stats.users) +
                    item('Channels', client.channels.cache.size) +
                    item('Guilds', stats.guilds.length) +
                    item('Node.js version', process.version) +
                    item('Discord.js version', 'v' + dV) +
                    item(
                        'TypeScript version',
                        'v' +
                            process.env.npm_package_devDependencies_typescript.split(
                                '^'
                            )[1]
                    ) +
                    item('Available commands', stats.commands) +
                    '\n• **Heap**:\n' +
                    item('Used', stats.heapUsage.used.str) +
                    item('Total', stats.heapUsage.total.str) +
                    '\n• **Uptime**:\n' +
                    item('Client', stats.uptimes.client.str) +
                    item('Host', stats.uptimes.host.str)
            )
            .setTimestamp();

        return message.channel.send(em);
    }
);
