import axios from 'axios';
import { CharacterProfile } from './types';

export async function getAllCharacterProfiles(
  characterName: string,
): Promise<CharacterProfile[]> {
  const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
}

export async function getOneCharacterProfile(characterName: string) {
  const url = `https://developer-lostark.game.onstove.com/armories/characters/${characterName}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
}
