//@ts-nocheck
import type { MitsuhaClient } from '../MitsuhaClient';

export const enableSlash = (client: MitsuhaClient): void => {
    client.api
        .applications(client.user.id)

        .commands.post({
            data: {
                name: 'hello',
                description: 'A simple slash command.',
            },
        });

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const command = interaction.data.name.toLowerCase();

        if (command === 'hello') {
            client.api
                .interactions(interaction.id, interaction.token)
                .callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: 'Hi there !',
                        },
                    },
                });
        } else if (command === 'ping') {
            client.api
                .interactions(interaction.id, interaction.token)
                .callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: `Pong! Took ${client.ws.ping}ms.`,
                        },
                    },
                });
        }
    });
};
