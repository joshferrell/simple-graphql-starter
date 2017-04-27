import * as graphql from 'graphql';
import { getInputFields, getOutputFields } from '../utils/index';

const fields = [
    {
        name: 'id',
        type: graphql.GraphQLID,
        definition: {
            description: 'The UUID of the account'
        },
        isOutput: true
    },
    {
        name: 'email',
        type: graphql.GraphQLString,
        definition: {
            description: 'The email of the account, must be unique'
        },
        isInput: true,
        isOutput: true,
        isRequired: true
    },
    {
        name: 'password',
        type: graphql.GraphQLString,
        definition: {
            description: 'Login password of the account'
        },
        isInput: true,
        isRequired: true
    },
    {
        name: 'steamId',
        type: graphql.GraphQLString,
        definition: {
            description: 'Steam ID of the account'
        },
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