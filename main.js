const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (interaction.commandName === 'wumpus') {
        await interaction.reply({files: ['wumpus/' + interaction.options.getString('emotion')]})
    }
});

client.login('MzA4MDIwNTIyNjQwNDc0MTE0.WQUgdw.bN_NgRUxnEd1ziSLzt25jFMDwzw');