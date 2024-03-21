"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const commands = [
    {
        name: '꽁치야',
        description: '꽁치를 불러보세요',
    },
];
const token = process.env.TOKEN;
const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
const getCharacterInfo = async (characterName) => {
    const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('response', response.data);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
};
try {
    console.log('Started refreshing application (/) commands.');
    rest.put(discord_js_1.Routes.applicationCommands('1219931909392699473'), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
}
catch (error) {
    console.error(error);
}
client.on('ready', () => {
    if (client && client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === '꽁치야') {
        const info = JSON.stringify(await getCharacterInfo('꽁치누나'));
        console.log('info', info);
        await interaction.reply(info);
    }
});
client.login(process.env.TOKEN);
