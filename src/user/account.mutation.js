import { GraphQLNonNull, GraphQLString, GraphQLBool } from 'graphql';
import { accountType, accountInputType, deleteAccount, setSteamId } from './account.schema';
import { createAccount } from './index';

const accountMutation = {
    createAccount: {
        type: accountType,
        args: {
            account: {
                type: new GraphQLNonNull(accountInputType)
            }
        },
        resolve: (_, args) => createAccount(args.account.email, args.account.password)
    },
    createSteamLink: {
        type: accountType,
        args: {
            token: {
                description: 'JWT token issued by account',
                type: new GraphQLNonNull(GraphQLString)
            },
            steamId: {
                description: 'Unique steam id',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (_, args) => setSteamId(args.token, args.steamId)
    },
    deleteAccount: {
        type: accountType,
        args: {
            token: {
                description: 'JWT token issued by account',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (_, args) => deleteAccount(args.token)
    }
};

export default accountMutation;
