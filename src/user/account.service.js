import * as accountModel from './account.model';
import * as authUtils from '../utils/auth.utils';

export const createAccount = (email, password) =>
    new Promise(async (resolve, reject) => {
        try {
            const duplicateAccount = await accountModel.getByEmail(email);

            if (duplicateAccount) {
                throw new Error('Account already registered');
            }

            const hashedPassword = await authUtils.hashPassword(password);
            const { steamId, id } = await accountModel.create(email, hashedPassword);

            const token = await authUtils.generateJwt({
                email,
                steamId,
                id
            });

            resolve({
                email,
                steamId,
                id,
                token
            });
        } catch (e) {
            switch (e.message) {
            case 'Account already registerd':
                reject('Account already exists, please check forgot password for more information');
                break;
            default:
                reject('Unknown error occured, please check logs or contact code maintainer.');
                break;
            }
        }
    });

export const setSteamId = (token, steamId) =>
    new Promise(async (resolve, reject) => {
        try {
            const decodedToken = await authUtils.decodeJwt(token);
            const account = await accountModel.setSteamId(decodedToken.id, steamId);

            resolve(
                Object.assign({}, account, { token })
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
            const token = await authUtils.generateJwt({
                email,
                steamId: account.steamId,
                id: account.id
            });

            resolve(Object.assign(
                {}, account, { token })
            );
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
            resolve({ id });
        } catch (e) {
            console.log(e);
            reject('Unable to login to account');
        }
    });

export const getBySteamId = steamId =>
    new Promise(async (resolve, reject) => {
        try {
            const {
                id,
                email
            } = await accountModel.getBySteamId(steamId);

            resolve({
                steamId,
                id,
                email
            });
        } catch (e) {
            reject('Unable to find account by steam id');
        }
    });
