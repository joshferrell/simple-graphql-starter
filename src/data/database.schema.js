import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { steamResolver } from '../steam/index';
import { accountResolver, accountMutation } from '../user/index';

const query = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        ...steamResolver,
        ...accountResolver
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
