import getOwnedGames from './getOwnedGames';

describe('Getting owned games from steam', () => {
    it('should return an array of games given a steam id', async () => {
        const games = await getOwnedGames('76561198048863602');
        return expect(games).toMatchSnapshot();
    });

    it('should reject if the steam id is invalid', () =>
        expect(getOwnedGames('123')).rejects
    );
});
