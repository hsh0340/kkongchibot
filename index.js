import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

const commands = [
    {
        name: '꽁치야',
        description: '꽁치를 불러보세요',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

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

const getCharacterInfo = async (characterName) => {
    const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            }
        })
        await console.log('response', response.data);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === '꽁치야') {

        const info = JSON.stringify(await getCharacterInfo('꽁치누나'));
        console.log('info', info)
        await interaction.reply(info);
    }
});

client.login(process.env.TOKEN);