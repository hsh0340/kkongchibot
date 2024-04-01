import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import dotenv from 'dotenv';

import { Embed } from './smilegate/types';
import { getOneCharacterProfile } from './smilegate/api';

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

    const info = await getOneCharacterProfile(characterName);

    if (!info) {
      await interaction.reply('존재하지 않는 캐릭터입니다.');
      return;
    }

    const embed: Embed = {
      color: 0x0099ff,
      title: `${characterName}`,
      author: {
        name: '꽁치봇',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
      },
      description: `서버 : ${info.ArmoryProfile.ServerName}\n길드 : ${info.ArmoryProfile.GuildName}\n클래스 : ${info.ArmoryProfile.CharacterClassName}\n전투 : ${info.ArmoryProfile.CharacterLevel}\n아이템 : ${info.ArmoryProfile.ItemAvgLevel}\n원정대 : ${info.ArmoryProfile.ExpeditionLevel}`,
      fields: [
        {
          name: '--------------------------------------------',
          value: '',
          inline: false,
        },
        {
          name: '장비',
          value: `${info.ArmoryEquipment[0].Type} : ${info.ArmoryEquipment[0].Name}\n${info.ArmoryEquipment[1].Type} : ${info.ArmoryEquipment[1].Name}\n${info.ArmoryEquipment[2].Type} : ${info.ArmoryEquipment[2].Name}\n${info.ArmoryEquipment[3].Type} : ${info.ArmoryEquipment[3].Name}\n${info.ArmoryEquipment[4].Type} : ${info.ArmoryEquipment[4].Name}\n${info.ArmoryEquipment[5].Type} : ${info.ArmoryEquipment[5].Name}\n${info.ArmoryEquipment[6].Type} : ${info.ArmoryEquipment[6].Name}(${info.ArmoryEquipment[6].Grade})\n${info.ArmoryEquipment[7].Type} : ${info.ArmoryEquipment[7].Name}(${info.ArmoryEquipment[7].Grade})\n${info.ArmoryEquipment[8].Type} : ${info.ArmoryEquipment[8].Name}(${info.ArmoryEquipment[8].Grade})\n${info.ArmoryEquipment[9].Type} : ${info.ArmoryEquipment[9].Name}(${info.ArmoryEquipment[9].Grade})\n${info.ArmoryEquipment[10].Type} : ${info.ArmoryEquipment[10].Name}(${info.ArmoryEquipment[10].Grade})\n${info.ArmoryEquipment[12].Type} : ${info.ArmoryEquipment[12].Name}(${info.ArmoryEquipment[12].Grade})`,
          inline: false,
        },
        {
          name: '--------------------------------------------',
          value: '',
          inline: false,
        },
        {
          name: '보석',
          value: 'Some value here',
          inline: false,
        },
        {
          name: 'Inline field title',
          value: 'Some value here',
          inline: true,
        },
      ],
      image: {
        url: `${info.ArmoryProfile.CharacterImage}`,
        width: 1000,
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: '꽁치봇',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };
    await interaction.reply({
      embeds: [embed],
    });
  }
});

client.login(process.env.TOKEN);
