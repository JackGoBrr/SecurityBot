const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const botconfig = require("..\\config\\config.json");
const { registerCommands, registerEvents } = require('.\\utils\\registry.js');
const packageJson = require('..\\package.json');
const got = require("got");
const keepAlive = require("./webserver.js");
require('dotenv').config();

const client = new discord.Client();

client.once("ready", () => {
    console.log(`\x1b[31m\x1b[1m[DroidHost]\x1b[35m\x1b[1m Recieved Command: \x1b[33m\x1b[1m\x1b[5mSTART_BOT\x1b[0m\n`);
	console.log('\x1b[34m\x1b[1m[Security]\x1b[0m \x1b[32mWelcome back!\x1b[0m');
	console.log(`\x1b[34m\x1b[1m[Security]\x1b[31m Security v${packageJson.version}\x1b[36m has connected to \x1b[35m\x1b[1mDiscord \x1b[36msuccessfully!\x1b[0m`)
    client.user.setActivity('.help', { type: 'LISTENING' }) //PLAYING, STREAMING, LISTENING, WATCHING
        .then(presence => console.log(`\n\x1b[33m[INTERNAL-THREAD8]\x1b[0m \x1b[34m\x1b[1m[INFO] \x1b[36mActivity set to:\x1b[31m Listening to ${presence.activities[0].name} \x1b[36mby [[DROID-API]]`))
        .catch(console.error);
});

client.on("message", message => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id)) {
        message.delete()

        let infoEmbed = new MessageEmbed()
        .setTitle('<:security:802284614218809374> Bot info')
        .setDescription('Hey! My name is **SecurityBot**.\nI am HighSecurity\'s Custom Bot, created by `Jackk#3018`.\n\nMy prefix here is `.`\nNeed help? Use `.help` for a list of commands!')
        .setColor(botconfig.EMBED_COLOR)
        .setTimestamp()
        .setFooter(`${client.user.username} by Jackk#3018`, `${client.user.displayAvatarURL()}`)

        message.channel.send(infoEmbed)
          .then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(console.error);
    };

    if (message.mentions.members.some(member => member.roles.cache.has("802119976143290379"))) {
      message.delete()

      let noPing = new MessageEmbed()
      .setTitle('<:peepoping:801509694338236448> Hey! Don\'t do that!')
      .setDescription('That user has `Ping Protection` set to **Enabled**\nPlease do not ping them!\n\n*If you are pinging a staff member,*\n*and you require support, please **make a ticket!***')
      .setColor(botconfig.EMBED_COLOR)
      .setTimestamp()
      .setFooter(`Ping Protection module for ${client.user.username} by Jackk#3018`, `${client.user.displayAvatarURL()}`)

      message.channel.send(noPing)
        .then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    }

  });

(async () => {
    keepAlive();
    await client.login();
    client.commands = new discord.Collection();
    await registerEvents(client, '..\\eventHandlers');
    await registerCommands(client, '..\\commands');
})();
