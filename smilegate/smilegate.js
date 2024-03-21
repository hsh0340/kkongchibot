"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneCharacterProfile = void 0;
const api_1 = require("./api");
async function getOneCharacterProfile(characterName) {
    const allCharacterProfiles = await (0, api_1.getAllCharacterProfiles)(characterName);
    if (!allCharacterProfiles) {
        throw new Error();
    }
    const characterProfile = allCharacterProfiles.find(characterProfile => characterProfile.CharacterName === characterName);
    if (!characterProfile) {
        throw new Error();
    }
    return characterProfile;
}
exports.getOneCharacterProfile = getOneCharacterProfile;
