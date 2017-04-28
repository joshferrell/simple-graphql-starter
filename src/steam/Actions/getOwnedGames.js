import fetch from 'node-fetch';
import { getGameDetails } from '../index';
import config from '../../config/index';

const getOwnedGames = steamId =>
    new Promise(async (resolve, reject) => {
        const url = `${config.steam.url}/IPlayerService/GetOwnedGames/v0001?key=${config.steam.apiKey}&steamid=${steamId}&format=json`;

        try {
            const res = await fetch(url);

            if (res.status !== 200) {
                throw new Error('Response from server not successful');
            }

            const body = await res.json();
            Promise.all(
                body.response.games.map((game) => {
                    const title = getGameDetails(game.appid);

                    return ({
                        id: game.appid,
                        playTime: game.playtime_forever,
                        title
                    });
                })
            ).then(results => {
                console.log(results);
                resolve(results)
            });
        } catch (e) {
            console.log(e);
            reject('Unable to access steam api');
        }
    });

export default getOwnedGames;
