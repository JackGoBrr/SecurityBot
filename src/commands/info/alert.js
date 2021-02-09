const Discord = require('discord.js');
const got = require("got");
const PREFIX = require('../../../config/config.json').PREFIX;
const EMBED_COLOR = require('../../../config/config.json').EMBED_COLOR;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "alert",
    aliases: ["streamalert"],
    description: "Alert @everyone about a new stream! \*REQUIRES ADMINSTRATOR PERMISSION\*",
    usage: `\`${PREFIX}alert <Game> <Stream Title>\``,
    cooldown: 0,
    perms: ["ADMINSTRATOR"],

    execute: async function(client, message, args) {

      message.delete()

      let game = args[0]
      let title = args.slice(1).join(" ");

      if (message.channel.id !== "801497568315310139") {
        let notHere = new MessageEmbed()
        .setTitle(':x: Not here, chief.')
        .setDescription('You may only run the `.alert` command inside of the <#801497568315310139> channel!\n*You must also have the ADMINSTRATOR permission to use the command!*')
        .setColor(EMBED_COLOR)
        .setTimestamp()
        .setFooter(`It was ${message.author.tag}! They did it in the wrong channel!!`, `${message.author.displayAvatarURL()}`)
        return message.reply(notHere)
          .then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(console.error);
      }

      if (!title) {
        let noGame = new MessageEmbed()
        .setTitle(':x: Invalid Syntax!')
        .setDescription('You must supply `2 arguments` to use this command!\n\nCorrect usage:\n`.alert <Game> <Stream Title>`')
        .setColor(EMBED_COLOR)
        .setTimestamp()
        .setFooter(`It was all ${message.author.tag}'s fault. They used the wrong syntax!`, `${message.author.displayAvatarURL()}`)

        return message.reply(noGame)
          .then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(console.error);
      }

      let alertEmbed = new MessageEmbed()
      .setTitle(':rotating_light: New stream alert!')
      .setDescription(`**HighSecurity_** is now **__LIVE!__**\n*Come join the stream and have some fun!*\n\n**__Stream Info__**\nGame » \`${args[0]}\`\nStream Title » \`${title}\`\n\n[Click Here](https://twitch.tv/highsecurity_) to join the stream, or use the link below!\nhttps://twitch.tv/HighSecurity_`)
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`Security by Jackk#3018`, `${client.user.displayAvatarURL()}`)

      message.channel.send("<@&801497568261177417>")
      message.channel.send(alertEmbed)
    }
}
