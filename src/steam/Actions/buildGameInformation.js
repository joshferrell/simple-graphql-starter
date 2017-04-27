import { getGameDetails } from '../index';

const formatGameInfo = async ({ id, playTime }) => {
    const title = getGameDetails(id);
    return ({
        id,
        title,
        playTime
    });
};

export const buildGameInformation = gameList =>
    Promise.all(
        gameList.map(game => formatGameInfo(game.id, game.playTime))
    );

export default buildGameInformation;
