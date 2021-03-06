import { sqlConnection, ormInit } from '../db/index';
import { createAccount, setSteamId, loginToAccount } from './account.service';
import config from '../config/index';

describe('account management', () => {
    beforeAll(() => {
        config.saltRounds = 1;
        config.sequelize.sync.force = true;
        return sqlConnection.authenticate();
    });

    beforeEach(() =>
        ormInit()
            .then(() => createAccount('jf@test.com', 'secure'))
    );

    it('should allow you to create an account with an email and password', async () => {
        const account = await createAccount('new@test.com', 'secure');
        expect(account).toHaveProperty('id');
        expect(account).toHaveProperty('email');
        return expect(account).toHaveProperty('steamId');
    });

    it('should not allow you to create an account when an email with that account already exists', async () =>
        expect(createAccount('bad@test.com', 'secure')).rejects
    );

    it('should allow you to set a steam id to an existing account', async () => {
        const { token } = await loginToAccount('jf@test.com', 'secure');
        const account = await setSteamId(token, '123');

        return expect(account.steamId).toBe('123');
    });

    it('should not allow you to set a steam id to an account if the auth token is invalid', () =>
        expect(setSteamId('12345', '123')).rejects
    );
});
