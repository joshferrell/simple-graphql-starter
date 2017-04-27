import fetch from 'node-fetch';
import config from '../config/index';

const getGameDetails = gameId =>
    new Promise(async (resolve, reject) => {
        const url = `${config.steam.url}/ISteamUserStats/GetSchemaForGame/v2/?key=${config.steam.apiKey}&appid=${gameId}`;

        try {
            const res = await fetch(url);

            if (res.status !== 200) {
                throw new Error('Response from server not successful');
            }

            const body = await res.json();
            resolve(body.game.gameName);
        } catch (e) {
            console.log(e);
            reject('Unable to access steam api');
        }
    });

export default getGameDetails;
