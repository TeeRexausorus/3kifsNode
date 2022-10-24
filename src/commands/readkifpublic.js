const {SlashCommandBuilder} = require('discord.js');
const pgController = require('../pgController');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('lireunkifpublic')
        .setDescription('Permet de lire un kif !'),
    async execute(interaction) {
        pgController.getRandomKif(interaction.user.id, interaction, false);
    },
};
