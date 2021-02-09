const Discord = require('discord.js');
const got = require("got");
const PREFIX = require('../../../config/config.json').PREFIX;
const EMBED_COLOR = require('../../../config/config.json').EMBED_COLOR;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    aliases: ["h", "commands"],
    description: "Get help on commands.",
    usage: `To get help on a specific command, use \`${PREFIX}help [command name]\` (without the [ ]).\nFor a full list of all commands, simply use \`${PREFIX}help\`.`,
    examples: `\`${PREFIX}help ping\``,

    execute: async function(client, message, args) {
        if (!args.length) {

            message.delete()

            let notHereChannelEmbed = new MessageEmbed()
            .setTitle('Not here, Cheif.')
            .setDescription('You can\'t use the `.help` command here!\nPlease keep all **bot commands** in <#801497569108295710>!')
            .setColor(EMBED_COLOR)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

            if (!['801497569108295710', '801835784902279188'].includes(message.channel.id)) {
                message.delete()
                return message.reply(notHereChannelEmbed)
                  .then(msg => {
                    msg.delete({ timeout: 10000 })
                  })
                  .catch(console.error);
              }

            let hEmbed = new MessageEmbed()
            .setTitle("**Command Categories**")
            .setColor(EMBED_COLOR)
            .setDescription(`Use \`${PREFIX}help [Command Name]\` to get more info on a specific command, for example: \`${PREFIX}help ping\``)
            .addFields(
          		{ name: 'Info', value: '`ping`, `help`', inline: true },
          		{ name: 'Fun', value: '`pete`', inline: true },
              { name: 'Moderation', value: 'Commands coming soon:tm:!', inline: true},
          	)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setThumbnail(client.user.displayAvatarURL())
            await message.channel.send(hEmbed)
              .then(msg => {
                msg.delete({ timeout: 30000 })
              })
              .catch(console.error);
        }
        else {

            message.delete()

            let notHereChannelEmbed = new MessageEmbed()
            .setTitle('Not here, Cheif.')
            .setDescription('You can\'t use the `.help` command here!\nPlease keep all **bot commands** in <#801497569108295710>!')
            .setColor(EMBED_COLOR)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

            if (!['801497569108295710', '801835784902279188'].includes(message.channel.id)) {
                message.delete()
                return message.reply(notHereChannelEmbed)
                  .then(msg => {
                    msg.delete({ timeout: 10000 })
                  })
                  .catch(console.error);
            }

            const cmdname = args[0].toLowerCase();
            const command = client.commands.get(cmdname) || client.commands.find(c => c.aliases && c.aliases.includes(cmdname));

            let invalidCommand = new MessageEmbed()
            .setTitle(':x: Invalid Command!')
            .setDescription('I did not recognise that command.\nPlease check the spelling, and try again\n\nOr, use `.help` for a list of commands!')
            .setColor(EMBED_COLOR)

            if (!command) return message.channel.send(invalidCommand)
              .then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);

            let hEmbed = new MessageEmbed()
            .setTitle(`**${command.name}**`)
            .setDescription(`${command.description}`)
            .setColor(EMBED_COLOR)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            if (command.usage) hEmbed.addField("**Usage:**", `${command.usage}`)
            if (command.aliases && command.aliases.length !== 0) hEmbed.addField("**Aliases:**", `${command.aliases.join(', ')}`)
            if (command.examples) hEmbed.addField("**Examples:**", `${command.examples}`)
            message.channel.send(hEmbed)
              .then(msg => {
                msg.delete({ timeout: 20000 })
              })
              .catch(console.error);
        }
    }
}
