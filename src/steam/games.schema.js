import * as graphql from 'graphql';
import { getOutputFields } from '../utils/index';

const fields = [
    {
        name: 'id',
        type: graphql.GraphQLID,
        definition: {
            description: 'The id of the game'
        },
        isOutput: true
    },
    {
        name: 'title',
        type: graphql.GraphQLString,
        definition: {
            description: 'The title of the game'
        },
        isOutput: true
    },
    {
        name: 'playTime',
        type: graphql.GraphQLInt,
        definition: {
            description: 'The number of hours the steam account has played the game'
        },
        isOutput: true
    }
];

const gameType = new graphql.GraphQLObjectType({
    name: 'Games',
    description: 'Steam Games',
    fields: getOutputFields(fields)
});

export default gameType;
