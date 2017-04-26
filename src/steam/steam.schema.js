import * as graphql from 'graphql';
import { getOutputFields } from '../utils/index';
import { accountType } from '../user/account.schema';
import gameType from './games.schema';

const fields = [
    {
        name: 'steamid',
        type: graphql.GraphQLID,
        description: 'The steam id of the account',
        isInput: false,
        isOutput: true
    },
    {
        name: 'account',
        type: accountType,
        description: 'The user account associated with the steam id',
        isInput: false,
        isOutput: true
    },
    {
        name: 'games',
        type: new graphql.GraphQLList(gameType),
        description: 'A list of steam games that the user has purchased',
        isInput: false,
        isOutput: true
    }
];

export const steamType = new graphql.GraphQLObjectType({
    name: 'Steam Account',
    description: 'A steam account with information',
    fields: getOutputFields(fields())
});
