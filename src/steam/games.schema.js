import * as graphql from 'graphql';
import { getOutputFields } from '../utils/index';

const fields = [
    {
        name: 'id',
        type: graphql.GraphQLID,
        description: 'The id of the game',
        isInput: false,
        isOutput: true
    },
    {
        name: 'title',
        type: graphql.GraphQLString,
        description: 'The title of the game',
        isInput: false,
        isOutput: true
    },
    {
        name: 'playTime',
        type: graphql.GraphQLInt,
        description: 'The number of hours the steam account has played the game',
        isInput: false,
        isOutput: true
    }
];

const gameType = new graphql.GraphQLObjectType({
    name: 'Games',
    description: 'Steam Games',
    fields: getOutputFields(fields)
});

export default gameType;
