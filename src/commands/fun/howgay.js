const Discord = require('discord.js');
const got = require("got");
const PREFIX = require('../../../config/config.json').PREFIX;
const EMBED_COLOR = require('../../../config/config.json').EMBED_COLOR;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "howgay",
    aliases: ["gayometer", "gayrate", "gaylevel"],
    description: "Shows you how :rainbow_flag: Gay :rainbow_flag: you are!",
    usage: `\`${PREFIX}gay\``,
    examples: "",
    cooldown: 0,
    perms: [],
    arguments: [],

    execute: async function(client, message, args) {

      message.delete()

      let notHereChannelEmbed = new MessageEmbed()
      .setTitle('Not here, Cheif.')
      .setDescription('You can\'t use the `.howgay` command here!\nPlease keep all **bot commands** in <#801497569108295710>!')
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

      const taggedUser = message.mentions.users.first();
      let gayrate = Math.floor(Math.random() * 101)

      if (!args.length) {

      let gayrateEmbed = new MessageEmbed()
      .setTitle(":rainbow_flag: Gay-O-Meter 4000")
      .setColor('RANDOM')
      .setDescription(`${message.author.username} is \`${gayrate}%\` gay! 🏳️‍🌈`)
      .setFooter(message.client.user.username, message.client.user.avatarURL())

      message.channel.send(gayrateEmbed);

    } else if (taggedUser) {
      let argsEmbed = new MessageEmbed()
      .setTitle(":rainbow_flag: Gay-O-Meter 4000")
      .setColor('RANDOM')
      .setDescription(`${taggedUser.username} is \`${gayrate}%\` gay! 🏳️‍🌈`)
      .setFooter(message.client.user.username, message.client.user.avatarURL())

      message.channel.send(argsEmbed);
    }
  }
};
