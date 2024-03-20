import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import dotenv from "dotenv";

dotenv.config();

const commands = [
    {
        name: '꽁치야',
        description: '꽁치를 불러보세요',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_SECRET);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1219931909392699473'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === '꽁치야') {
        await interaction.reply('네 주인님');
    }
});

client.login(process.env.CLIENT_SECRET);
