const {SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js');
const pgController = require('../pgController');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('modalkif')
        .setDescription('Pour ajouter un kif mais dans une modal. On arrête pas le progès ma bonne dame.'),
    async execute(interaction) {
        if (interaction.commandName === 'modalkif') {
            const modal = new ModalBuilder()
                .setCustomId('kifModal')
                .setTitle('J\'ai eu un kif !');

            // Add components to modal
            const kifInput = new TextInputBuilder()
                .setCustomId('textKifInput')
                .setLabel("Et quel était ce kif ?")
                .setStyle(TextInputStyle.Paragraph);

            const kifActionRow = new ActionRowBuilder().addComponents(kifInput);

            // Add input to the modal
            modal.addComponents(kifActionRow);

            // Show the modal to the user
            await interaction.showModal(modal);
        }
    }
};
