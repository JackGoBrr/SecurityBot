const Discord = require('discord.js');
const PREFIX = require("../../config/config.json").PREFIX;
const EMBED_COLOR = require('../../config/config.json').EMBED_COLOR;
const { processArguments } = require("../utils/utils")
const { Collection } = require("discord.js")
const { MessageEmbed } = require("discord.js");
const cooldowns = new Collection();
const got = require("got");

module.exports = async (client, message) => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.startsWith(PREFIX)) return;

    let msgargs = message.content.substring(PREFIX.length).split(new RegExp(/\s+/));
    let cmdName = msgargs.shift().toLowerCase();

    const command = await client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if (!command) return;
    if (command.perms) {
        if (!message.member.hasPermission(command.perms)) return
    }

    const cd = command.cooldown;
    if (cd) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = cd * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            let cdEmbed = new MessageEmbed()
            .setTitle('Hey! Not so fast.')
            .setDescription(`That command is on cooldown!\nYou must wait **${new Date(expirationTime - now).toISOString().substr(11, 8)}** before using it again!`)
            .setColor(EMBED_COLOR)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)

            if (now < expirationTime) return await message.channel.send(cdEmbed)
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    if (command.arguments && command.arguments.length !== 0) processArguments(message, command.arguments, msgargs)

    command.execute(client, message, msgargs);
};
