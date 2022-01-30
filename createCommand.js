const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const commands =
    [{
        name: 'ping',
        description: 'Replies with Pong!'
    },
        {
            name: 'wumpus',
            description: 'Sends a Wumpus sticker',
            options: [
                {
                    name: 'emotion',
                    description: 'The emotion Wumpus should display',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name:'angry',
                            value:'angry.gif'
                        },

                        {
                            name:'aww',
                            value:'aww.gif'
                        },

                        {
                            name:'blush',
                            value:'blush.gif'
                        },

                        {
                            name:'cry',
                            value:'cry.gif'
                        },

                        {
                            name:'curious',
                            value:'curious.gif'
                        },

                        {
                            name:'dance',
                            value:'dance.gif'
                        },

                        {
                            name:'evil',
                            value:'evil.gif'
                        },

                        {
                            name:'frustrated',
                            value:'frustrated.gif'
                        },

                        {
                            name:'hug',
                            value:'hug.gif'
                        },

                        {
                            name:'hungry',
                            value:'hungry.gif'
                        },

                        {
                            name:'joy',
                            value:'joy.gif'
                        },

                        {
                            name:'love',
                            value:'love.gif'
                        },

                        {
                            name:'nervous',
                            value:'nervous.gif'
                        },

                        {
                            name:'no',
                            value:'no.gif'
                        },

                        {
                            name:'ok',
                            value:'ok.gif'
                        },

                        {
                            name:'relief',
                            value:'relief.gif'
                        },

                        {
                            name:'sad',
                            value:'sad.gif'
                        },

                        {
                            name:'scared',
                            value:'scared.gif'
                        },

                        {
                            name:'sick',
                            value:'sick.gif'
                        },

                        {
                            name:'sleepy',
                            value:'sleepy.gif'
                        },

                        {
                            name:'smile',
                            value:'smile.gif'
                        },

                        {
                            name:'surprise',
                            value:'surprise.gif'
                        },

                        {
                            name:'thanks',
                            value:'thanks.gif'
                        },

                        {
                            name:'thinking',
                            value:'thinking.gif'
                        },

                        {
                            name:'wave',
                            value:'wave.gif'
                        }
                    ]
                }
            ]
        },
        {
            name: 'colour',
            description: 'Sets user colour',
            options: [
                {
                    name: 'colour',
                    description: 'The colour you want',
                    type: 3,
                    required: true
                }

            ]

        }
        ];

const rest = new REST({version: '9'}).setToken('MzA4MDIwNTIyNjQwNDc0MTE0.WQUgdw.bN_NgRUxnEd1ziSLzt25jFMDwzw');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands("308020522640474114", "424671611057078283"),
            // Routes.applicationCommands("308020522640474114"),
            {body: commands},
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();