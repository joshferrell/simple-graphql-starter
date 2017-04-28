import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { accountResolver, accountMutation } from '../user/index';
import { steamResolver } from '../steam/index';

console.log(steamResolver);

const query = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        ...accountResolver,
        ...steamResolver
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type',
    fields: {
        ...accountMutation
    }
});

const schema = new GraphQLSchema({
    query,
    mutation
});

export default schema;
