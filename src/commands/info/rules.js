const Discord = require('discord.js');
const got = require("got");
const PREFIX = require('../../../config/config.json').PREFIX;
const EMBED_COLOR = require('../../../config/config.json').EMBED_COLOR;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "rules",
    aliases: ["rule"],
    description: "Shows the specified rule that you request!",
    usage: `\`${PREFIX}rule #\``,
    cooldown: 10,

    execute: async function(client, message, args) {

      let checkRulesEmbed = new MessageEmbed()
      .setTitle('Looking for the rules?')
      .setDescription('Check out the <#801497568315310136> channel to view the rules,\nor run `!rules (# / all)` to see a specific rule!')
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let notHereEmbed = new MessageEmbed()
      .setTitle('Not here, Chief.')
      .setDescription('The `all` subcommand can only be used in the <#801497568315310136> channel.\nCheck out the rules channel, or run `!rules (Rule Number)`')
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule1 = new MessageEmbed()
      .setTitle(':warning: 1. All users must adheer to the Discord Guidelines and ToS')
      .setDescription(':white_small_square: Discord Guidelines: <https://discord.com/guidelines>\n:white_small_square: Discord Terms of Service: <https://discord.com/terms>\n:white_small_square: We are an English-Speaking server.\n:white_small_square: Under 13s should not be on Discord and will be banned.')
      .setColor('ed2424')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule2 = new MessageEmbed()
      .setTitle(':underage: 2. Maturity')
      .setDescription(':white_small_square: Act as an adult would.\n:white_small_square: No tolerance for people doing anything illegal or inhumane within the server, or voice chat\n:white_small_square: Explicit messages will be a mute (or ban depending on the case), anywhere on the server.\n:white_small_square: Malicious behaviour - raids, threats, doxxing, harassment to any individual or community will be an instant ban.\n:white_small_square: Falsely accusing people because you dislike them is not okay and will be punished.')
      .setColor('e87720')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule3 = new MessageEmbed()
      .setTitle(':boom: 3. Behaviour')
      .setDescription(':white_small_square: Have respect for each other\'s opinions, and conversations.\n:white_small_square: Intentionally making people uncomfortable is not the way to go.\n:white_small_square: Banned topics: All NSFW, Dark/edgy humour, political, controversial & sex topics (unless in an NSFW / Unmoderated channel).\n:white_small_square: All phobic, racist, sexist comments or slangs are immediate bans (unless in an NSFW / Unmoderated channel).\n:white_small_square: Nicknames, emotes, avatars, status and general conversation must be safe for work (unless in an NSFW / Unmoderated channel).')
      .setColor('e6d329')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule4 = new MessageEmbed()
      .setTitle(':speech_balloon: 4. DMing Users')
      .setDescription(':white_small_square: **What is okay:** Messaging a user if you have asked them and they say it is ok\n:white_small_square: **What is not okay:** Messaging a user that did not allow you to / Posting invites to other servers, group DMs or sending invites to people in DMs.')
      .setColor('29e64c')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule5 = new MessageEmbed()
      .setTitle(':book: 5. Text Channel Rules')
      .setDescription(':white_small_square: Do not post invite links in any other channel than advertising.\n:white_small_square: Do not spam (5+ messages in a chain / before someone else talks = Spam)\n:white_small_square: Do not use Zalgo / Special Charaters, or talk in seperate message all the time\n:white_small_square: Do not spoiler bait with racial slurs. E.g. ni||ce ca||r\n:white_small_square: Keep reaction/emote spamming to a minimum, don’t be disruptive with them.')
      .setColor('29c7e6')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule6 = new MessageEmbed()
      .setTitle(':loud_sound: 6. Voice Channel Rules')
      .setDescription(':white_small_square: No loud sounds / earrape with your microphone / the music bots (unless everyone agrees)\n:white_small_square: Do not AFK in channels while still at your PC. (You may go away from your PC and stay in the channel, as you will be moved automatically to the AFK VC.)\n:white_small_square: You must only use VCs for their correct purpose (e.g. Do not use the Music Bots outside of the music channels)')
      .setColor('2945e6')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule7 = new MessageEmbed()
      .setTitle(':computer: 7. Hacking & Piracy')
      .setDescription(':white_small_square: Any discussion about hacking in games will be stopped/purged and you will be punished.\n:white_small_square: Sharing any piracy links will have you banned immediately, this includes DMs.')
      .setColor('aa29e6')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let rule8 = new MessageEmbed()
      .setTitle(':police_officer: 8. Respect Staff')
      .setDescription(':white_small_square: No backseat modding or arguing about mod decisions (lawyering).\n:white_small_square: Issues with staff are dealt with by Senior staff.\n:white_small_square: Moderators reserve the right to warn/mute/kick accordingly.\n:white_small_square: Staff may steer conversations away from certain topics, respect this.')
      .setColor('e629c0')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let notARuleEmbed = new MessageEmbed()
      .setTitle('Can\'t find that one, Cheif.')
      .setDescription('Check out <#801497568315310136> for a full list,\nand run a valid rule number. `Example: !rule 8`')
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      let staffEmbed = new MessageEmbed()
      .setTitle('Note: Staff always reserve the right to punish.')
      .setDescription('Just be sensible, don\'t be stupid, and don\'t break any of these rules!')
      .setColor(EMBED_COLOR)
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

      if (!args.length) {
        message.delete()
        message.channel.send(checkRulesEmbed)
          .then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(console.error);
      } else if (args[0] == "all") {
        if (message.channel.id !== '801497568315310136') {
          message.delete()
          message.channel.send(notHereEmbed)
            .then(msg => {
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
        } else if (message.channel.id == '801497568315310136') {
          message.delete()
          message.channel.send(rule1)
          message.channel.send(rule2)
          message.channel.send(rule3)
          message.channel.send(rule4)
          message.channel.send(rule5)
          message.channel.send(rule6)
          message.channel.send(rule7)
          message.channel.send(rule8)
          message.channel.send(staffEmbed)
        }} else if (args[0] == "1") {
          message.delete()
          message.channel.send(rule1)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "2") {
          message.delete()
          message.channel.send(rule2)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "3") {
          message.delete()
          message.channel.send(rule3)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "4") {
          message.delete()
          message.channel.send(rule4)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "5") {
          message.delete()
          message.channel.send(rule5)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "6") {
          message.delete()
          message.channel.send(rule6)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "7") {
          message.delete()
          message.channel.send(rule7)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "8") {
          message.delete()
          message.channel.send(rule8)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else if (args[0] == "staff") {
          message.delete()
          message.channel.send(staffEmbed)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        } else {
          message.delete()
          message.channel.send(notARuleEmbed)
            .then(msg => {
              msg.delete({ timeout: 15000 })
            })
            .catch(console.error);
        }

    }
}
