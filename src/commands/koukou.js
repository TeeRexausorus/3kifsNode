const {SlashCommandBuilder} = require('discord.js');
const pgController = require("../pgController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('koukou')
        .setDescription('Permet de lancer une conversation privée avec le bot (avec un K comme kif)'),
    async execute(interaction, client) {},
};
