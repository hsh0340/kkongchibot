import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import dotenv from 'dotenv';
import { getOneCharacterProfile } from './smilegate/smilegate';

dotenv.config();

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
const token = process.env.TOKEN as string;
const rest = new REST({ version: '10' }).setToken(token);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands('1219931909392699473'), {
    body: [
      {
        name: '캐릭터정보',
        description: '캐릭터 정보를 가져옵니다.',
        options: [
          {
            name: '캐릭터명',
            description: '캐릭터 이름을 입력하세요.',
            type: 3,
            required: true,
          },
        ],
      },
    ],
  });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

client.on('ready', () => {
  if (client && client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === '캐릭터정보') {
    const characterName = interaction.options.getString('캐릭터명');

    if (!characterName) {
      await interaction.reply('제대로 입력해.');
      return;
    }

    const info =
      JSON.stringify(await getOneCharacterProfile(characterName)) + '!@!@';
    await interaction.reply(info);
  }
});

client.login(process.env.TOKEN);
