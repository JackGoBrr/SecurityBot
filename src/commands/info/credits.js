const Discord = require('discord.js');
const got = require("got");
const PREFIX = require('../../../config/config.json').PREFIX;
const EMBED_COLOR = require('../../../config/config.json').EMBED_COLOR;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "credits",
    aliases: ["creditspanel", "credit", "botcredits"],
    description: "Shows the developers and contributors toward the **SecurityBot** project.",
    usage: `${PREFIX}credits`,
    cooldown: 15,

    execute: async function(client, message, args) {

      let notHereChannelEmbed = new MessageEmbed()
      .setTitle('Not here, Cheif.')
      .setDescription('You can\'t use the `.credits` command here!\nPlease keep all **bot commands** in <#801497569108295710>!')
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)

      if (!['801497569108295710', '801835784902279188'].includes(message.channel.id)) {
          message.delete()
          return message.reply(notHereChannelEmbed)
            .then(msg => {
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
        }

      message.delete()

      let creditPanel = new MessageEmbed()
      .setTitle(':robot: SecurityBot Credits')
      .setDescription('*Below is a list of all developers and contributors that helped design and code the SecurityBot Project*\n\n:desktop: **Developers**\n» **Jack** (Jackk#3018) [Lead Developer]\n\n:gem: Client(s)\n» **HighSecurity** (highsecurity#9664) [Server Owner]')
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`${client.user.username} by Jackk#3018`, `${client.user.displayAvatarURL()}`)

      message.channel.send(creditPanel)
        .then(msg => {
          msg.delete({ timeout: 30000 })
        })
        .catch(console.error);
    }
}
