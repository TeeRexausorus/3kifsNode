//init pour DiscordModule
var cron = require('node-cron');
const pgController = require('./pgController');
                       //s m h  d m y
cron.schedule('0 0 20 * * *', async () => {
    await notifyUsers()
});

require('dotenv').config();
const {Client, GatewayIntentBits, Partials, Collection} = require('discord.js');
//const pgController = require('./pgController')
const path = require("path");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

const TOKEN_DISCORD = process.env.TOKEN_DISCORD;

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.login(TOKEN_DISCORD).then(() => console.log('3kifs bot created'))
    .catch(err => console.error('3kifs bot creation error', err.stack));

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
});


let notifyUsers = async () => {
    let ids = await pgController.getUserIds();
    ids.forEach((user) => {
        client.users.fetch(user.userId).then((user) => {user.send('Hey ! T\'as bien kiffé ta journée ? Tu me racontes ?');});
    })

}
