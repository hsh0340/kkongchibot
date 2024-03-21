"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCharacterProfiles = void 0;
const axios_1 = __importDefault(require("axios"));
async function getAllCharacterProfiles(characterName) {
    const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw new Error();
    }
}
exports.getAllCharacterProfiles = getAllCharacterProfiles;
