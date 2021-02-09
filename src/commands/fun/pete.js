const Discord = require('discord.js');
const got = require("got");
const PREFIX = require('../../../config/config.json').PREFIX;
const EMBED_COLOR = require('../../../config/config.json').EMBED_COLOR;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pete",
    aliases: ["peter", "petecavemaster", "highsecurity"],
    description: "Shows Pete's favourite YouTube Video",
    usage: `\`${PREFIX}pete`,
    cooldown: 120,

    execute: async function(client, message, args) {

      message.delete()

      let peteEmbed = new MessageEmbed()
      .setTitle(':video_camera: Pete\'s __FAVOURITE__ YouTube video!')
      .setDescription('[Click Here](https://www.youtube.com/watch?v=dQw4w9WgXcQ) to watch Pete\'s FAVOURITE YouTube video!\nIt really is a great one!!')
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)

      message.channel.send(peteEmbed)
        .then(msg => {
          msg.react("👎")
          msg.delete({ timeout: 10000 })
        });
    }
};
