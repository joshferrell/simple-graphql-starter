import * as accountModel from './account.model';
import * as authUtils from '../utils/auth.utils';

export const createAccount = (email, password) =>
    accountModel.getByEmail(email)
        .then(account => (
            !account ? account : Promise.reject(new Error('Account already registered')))
        ).then(() => authUtils.hashPassword(password))
        .then(hashedPassword => accountModel.create(email, hashedPassword));

export const setSteamId = (token, steamId) =>
    new Promise(async (resolve, reject) => {
        try {
            const decodedToken = await authUtils.decodeJwt(token);
            const account = await accountModel.setSteamId(decodedToken.id, steamId);

            resolve(
                Object.assign({}, account, { token: decodedToken })
            );
        } catch (e) {
            console.log(e);
            reject('Unable to authenticate user');
        }
    });

export const verifyAccountPassword = (email, inputPassword) =>
    accountModel.getByEmail(email)
        .then(({ password }) => authUtils.comparePassword(inputPassword, password));

export const getAccountById = id =>
    accountModel.get(id)
        .then(account => (
            account || Promise.reject(new Error('Account does not exist.'))
        ));

export const loginToAccount = (email, password) =>
    new Promise(async (resolve, reject) => {
        try {
            await verifyAccountPassword(email, password);
            const account = await accountModel.getByEmail(email);
            const token = await authUtils.generateJwt({ email, id: account.id });

            resolve(Object.assign({}, account, { token }));
        } catch (e) {
            console.log(e);
            reject('Unable to login to account');
        }
    });

export const deleteAccount = token =>
    new Promise(async (resolve, reject) => {
        try {
            const { id } = await authUtils.decodeJwt(token);
            await accountModel.deleteAccount(id);
            resolve(true);
        } catch (e) {
            console.log(e);
            reject('Unable to login to account');
        }
    });
