const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const config = require('./config.json')

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
    } else {
        if (interaction.commandName === 'colour') {
            let hexRE = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
            if (!hexRE.test(interaction.options.getString('colour'))) {
                await interaction.reply('That\'s not a colour!');
                return;
            }
            let desiredColour = interaction.options.getString('colour').toUpperCase();
            // If a three-character hexcolor, make six-character
            if (desiredColour.length === 4) {
                desiredColour = '#' + desiredColour.replace('#', '').split('').map(function (hex) {
                    return hex + hex;
                }).join('');
            }

            let newRoleInfo = {
                name: desiredColour,
                color: desiredColour,
                reason: 'User desired new role for setting colour'
            }

            let roles = interaction.member.roles.cache.map(role => role);
            roles.forEach(async role => {
                if (role.name.startsWith('#')) {
                    await interaction.member.roles.remove(role);
                    if (role.members.size == 0) {
                        interaction.guild.roles.delete(role);
                    }
                }
            });

            interaction.guild.roles.create(newRoleInfo).then((newRole) => {
                    interaction.member.roles.add(newRole);
                }
            );
            await interaction.reply({content: 'Now you look all ' + desiredColour + '!', ephemeral: true});

        }
    }
});

client.login(config.token);