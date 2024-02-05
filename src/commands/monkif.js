const {SlashCommandBuilder} = require('discord.js');
const pgController = require("../pgController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('monkif')
        .setDescription('Permet d\'ajouter un kif !')
        .addStringOption(option =>
            option.setName('kif')
                .setDescription('Le kif du jour').setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('public')
                .setDescription('Le lire à l\'ajout ?').setRequired(false)),
    async execute(interaction) {
        let kiffance = interaction.options.getString('kif');
        let publicKif = interaction.options.getBoolean('public') === null ? false : interaction.options.getBoolean('public');
        let {id: userId, username} = interaction.user;
        pgController.insertKif(userId, username, kiffance);
        interaction.reply({content: `Tu as donc eu ce kif : "${kiffance}". Et quoi d'autre ? :D`, ephemeral: !publicKif});
    },
};
