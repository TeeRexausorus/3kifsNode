const {SlashCommandBuilder} = require('discord.js');
const pgController = require("../pgController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changenotif')
        .setDescription('Permet de changer l\'état de la notification.'),
    async execute(interaction, client) {
        let {id: userId} = interaction.user;
        pgController.swapNotif(userId, interaction)
    },
};
