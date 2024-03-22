import { getAllCharacterProfiles } from './api';
import { CharacterProfile } from './types';

export async function getOneCharacterProfile(
  characterName: string,
): Promise<CharacterProfile> {
  const allCharacterProfiles = await getAllCharacterProfiles(characterName);

  if (!allCharacterProfiles) {
    throw new Error();
  }

  const characterProfile = allCharacterProfiles.find(
    (characterProfile) => characterProfile.CharacterName === characterName,
  );

  if (!characterProfile) {
    throw new Error();
  }

  return characterProfile;
}
