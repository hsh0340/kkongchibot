"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const dotenv_1 = __importDefault(require("dotenv"));
const smilegate_1 = require("./smilegate/smilegate");
dotenv_1.default.config();
const commands = [
    {
        name: '캐릭터정보',
        description: '캐릭터 정보 확인',
    },
    {
        name: '메롱',
        description: '메롱',
    },
];
const token = process.env.TOKEN;
const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
try {
    console.log('Started refreshing application (/) commands.');
    rest.put(discord_js_1.Routes.applicationCommands('1219931909392699473'), { body: [
            {
                name: '캐릭터정보',
                description: '캐릭터 정보를 가져옵니다.',
                options: [
                    {
                        name: '캐릭터명',
                        description: '캐릭터 이름을 입력하세요.',
                        type: 3,
                        required: true
                    }
                ]
            }
        ] });
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
    if (interaction.commandName === '캐릭터정보') {
        const characterName = interaction.options.getString('캐릭터명');
        console.log(characterName);
        if (!characterName) {
            await interaction.reply('제대로 입력해.');
            return;
        }
        const info = JSON.stringify(await (0, smilegate_1.getOneCharacterProfile)(characterName));
        console.log('info', info);
        await interaction.reply(info);
    }
});
const data = new discord_js_1.SlashCommandBuilder().setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option => option.setName('input')
    .setDescription('The input to echo back'));
client.login(process.env.TOKEN);
