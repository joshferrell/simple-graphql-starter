import * as graphql from 'graphql';
import { getOutputFields } from '../utils/index';
import { accountType } from '../user/account.schema';
import gameType from './games.schema';

const fields = [
    {
        name: 'steamid',
        type: graphql.GraphQLID,
        definition: {
            description: 'The steam id of the account'
        },
        isOutput: true
    },
    {
        name: 'account',
        type: accountType,
        definition: {
            description: 'The user account associated with the steam id'
        },
        isOutput: true
    },
    {
        name: 'games',
        type: new graphql.GraphQLList(gameType),
        definition: {
            description: 'A list of steam games that the user has purchased'
        },
        isOutput: true
    }
];

export const steamType = new graphql.GraphQLObjectType({
    name: 'Steam Account',
    description: 'A steam account with information',
    fields: getOutputFields(fields())
});
