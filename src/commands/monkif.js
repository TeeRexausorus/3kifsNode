const {SlashCommandBuilder} = require('discord.js');
const pgController = require("../pgController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('monkif')
        .setDescription('Permet d\'ajouter un kif !')
        .addStringOption(option =>
            option.setName('kif')
                .setDescription('Le kif du jour').setRequired(true)
        ),
    async execute(interaction) {
        let kiffance = interaction.options.getString('kif');
        let userId = interaction.user.id;
        let username = interaction.user.username;
        pgController.insertKif(userId, username, kiffance);
        await interaction.reply(`Tu as donc eu ce kif : "${kiffance}". Et quoi d'autre ? :D`);
    },
};
