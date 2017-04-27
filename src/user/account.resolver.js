import { GraphQLID, GraphQLNonNull } from 'graphql';
import { getAccountById } from './index';
import { accountType } from './account.schema';

const accountResolver = {
    account: {
        type: accountType,
        description: 'Get a single account by account id',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                description: 'UUID of the account'
            }
        },
        resolve: ((_, args) => getAccountById(args.id))
    }
};

export default accountResolver;
