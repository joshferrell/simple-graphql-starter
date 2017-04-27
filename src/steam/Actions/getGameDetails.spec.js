import getGameDetails from './getGameDetails';

describe('get steam game details', () => {
    it('should return game information', async () => {
        const game = await getGameDetails('218620');
        expect(game).toMatchSnapshot();
    });

    it('should reject if the game does not exist', () =>
        expect(getGameDetails('a')).rejects
    );
});
