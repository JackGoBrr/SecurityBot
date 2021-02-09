const Discord = require('discord.js');
const got = require("got");
const PREFIX = require('../../../config/config.json').PREFIX;
const EMBED_COLOR = require('../../../config/config.json').EMBED_COLOR;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    description: "Get the bots current ping.",
    usage: `\`${PREFIX}ping\``,
    cooldown: 30,

    execute: async function(client, message, args) {

        try {

            let notHereChannelEmbed = new MessageEmbed()
            .setTitle('Not here, Cheif.')
            .setDescription('You can\'t use the `.ping` command here!\nPlease keep all **bot commands** in <#801497569108295710>!')
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

            let pingEmbed = new MessageEmbed()
            .setTitle(':ping_pong: Pinging...')
            .setColor(EMBED_COLOR)

            const msg = await message.channel.send(pingEmbed);

            let pongEmbed = new MessageEmbed()
            .setTitle(':ping_pong: **Pong!**')
            .setDescription(`⌛ Bot Latency: \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\n⏲️ API Latency: \`${Math.round(message.client.ws.ping)}ms\``)
            .setColor(EMBED_COLOR)
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)

            await msg.edit(pongEmbed)
              .then(msg => {
                msg.delete({ timeout: 30000 })
              })
              .catch(console.error);
        } catch (err) {
            let errorEmbed = new MessageEmbed()
            .setTitle(':x: Error!')
            .setDescription(`Something went wrong when running that command.\nPlease forward this issue to Jack.\n\n» PacketAction: \`PING_ACTION_PACKET\`\n» Server: \`DISCORD_API_NA_04\`\n» Error Code: \`${err.message}\``)
            .setColor(EMBED_COLOR)
            .setFooter(`${client.user.username} by Jackk#3018`, `${client.user.displayAvatarURL()}`)

            message.channel.send(errorEmbed)
              .then(msg => {
                msg.delete({ timeout: 30000 })
              })
              .catch(console.error);
        }
    }
}
