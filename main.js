const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const fs = require('fs')


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (interaction.commandName === 'wumpus') {
        await interaction.reply({files: ['wumpus/' + interaction.options.getString('emotion')]})
    } else if (interaction.commandName === 'colour') {
        let hexRE = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
        if (!hexRE.test(interaction.options.getString('colour'))) {
            await interaction.reply('That\'s not a colour!');
            return;
        }
        await interaction.reply('cool');
        let desiredColour = interaction.options.getString('colour').toLowerCase();

        let newRoleInfo = {
            name: desiredColour,
            color: desiredColour,
            reason: 'User desired new role for setting colour'
        }
        interaction.guild.roles.create(newRoleInfo).then((newrole) => {
                interaction.member.roles.add(newRole);
            }
        )


    }
});

client.login(fs.readFileSync('token.txt', 'utf-8'));