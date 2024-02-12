const { Client, Intents, ActivityType } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const config = require('./config.json')

const fs = require('fs');

async function mconline() {
    let playernames;
    try {
    let online = await ((await fetch(`https://api.mcsrvstat.us/3/${config.mcserver}`)).json());
    playernames = [];
    if(online.players.online > 0) {
        playernames = online.players.list.map(p => p.name);
    }
    client.user.setActivity(`${config.mcserver} | ${playernames.length} online`, { type: "PLAYING" });
    console.log("update", playernames);
    }
    catch(e) {
        console.error("Could not update", e);
    }
    return playernames;
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    mconline();
    setInterval(mconline, 60*1000)
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (interaction.commandName === 'wumpus') {
        await interaction.reply({ files: ['wumpus/' + interaction.options.getString('emotion')] })
    } else if (interaction.commandName === 'colour') {
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
        await interaction.reply({ content: 'Now you look all ' + desiredColour + '!', ephemeral: true });
    }
    else if (interaction.commandName === 'online') {
        let players = await mconline();
        // await interaction.reply({content: `${(players).map(p => p + "\n")}`});
        let msgcontent = {
            embeds:
                [{
                    "title": `${config.mcserver}`,
                    "description": `${players.length} players online`,
                    "color": 0x00FFFF,
                    fields: players.map(function (p) {
                        return { name: p, value: " " }
                    })
                }]
        }
        await interaction.reply(msgcontent);
    }
});



client.login(config.token);