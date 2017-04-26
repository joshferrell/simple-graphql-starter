import * as graphql from 'graphql';
import { getInputFields, getOutputFields } from '../utils/index';

const fields = [
    {
        name: 'id',
        type: graphql.GraphQLID,
        description: 'The UUID of the account',
        isInput: false,
        isOutput: true
    },
    {
        name: 'email',
        type: graphql.GraphQLString,
        description: 'The email of the account, must be unique',
        isInput: true,
        isOutput: true
    },
    {
        name: 'password',
        type: graphql.GraphQLString,
        description: 'Login password of the account',
        isInput: true,
        isOutput: false
    },
    {
        name: 'steamId',
        type: graphql.GraphQLString,
        description: 'Steam ID of the account',
        isInput: true,
        isOutput: true
    }
];

export const accountType = new graphql.GraphQLObjectType({
    name: 'Account',
    description: 'A user account',
    fields: getOutputFields(fields)
});

export const accountInputType = new graphql.GraphQLInputObjectType({
    name: 'AccountInput',
    fields: getInputFields(fields)
});
