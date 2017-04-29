import * as graphql from 'graphql';
import { getInputFields, getOutputFields } from '../utils/index';
import { steamType } from '../steam/steam.schema';

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
    },
    {
        name: 'token',
        type: graphql.GraphQLString,
        definition: {
            description: 'JWT token that was issued to the account'
        },
        isOutput: true
    },
    {
        name: 'steamAccount',
        type: steamType,
        definition: {
            description: 'Steam account associated with account',
            resolve: ({ steamId }) => ({ steamId })
        },
        isOutput: true
    }
];

const steamInputFields = [
    {
        name: 'steamId',
        type: graphql.GraphQLString,
        definition: {
            description: 'Steam ID of the account'
        },
        isInput: true,
        isRequired: true
    },
    {
        name: 'token',
        type: graphql.GraphQLString,
        definition: {
            description: 'JWT token that was issued to the account'
        },
        isInput: true,
        isRequired: true
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

export const accountSteamInput = new graphql.GraphQLInputObjectType({
    name: 'SteamAccountInput',
    fields: getInputFields(steamInputFields)
});
