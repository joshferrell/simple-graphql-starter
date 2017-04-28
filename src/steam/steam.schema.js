import * as graphql from 'graphql';
import { getOutputFields } from '../utils/index';
import { getOwnedGames, getSteamId } from './index';
import { getBySteamId } from '../user/account.service';
import { accountType } from '../user/account.schema';
import gameType from './games.schema';

const fields = [
    {
        name: 'steamid',
        type: graphql.GraphQLID,
        definition: {
            description: 'The steam id of the account',
            resolve: (({ vanityUrl }) => getSteamId(vanityUrl))
        },
        isOutput: true
    },
    {
        name: 'account',
        type: accountType,
        definition: {
            description: 'The user account associated with the steam id',
            resolve: (({ steamId }) => getBySteamId(steamId))
        },
        isOutput: true
    },
    {
        name: 'games',
        type: new graphql.GraphQLList(gameType),
        definition: {
            description: 'A list of steam games that the user has purchased',
            resolve: (({ steamId }) => getOwnedGames(steamId))
        },
        isOutput: true
    },
    {
        name: 'vanityUrl',
        type: graphql.GraphQLString,
        definition: {
            description: 'The vanity url for a steam account'
        },
        isOutput: true
    }
];

export const steamType = new graphql.GraphQLObjectType({
    name: 'steamAccount',
    description: 'A steam account with information',
    fields: getOutputFields(fields)
});
