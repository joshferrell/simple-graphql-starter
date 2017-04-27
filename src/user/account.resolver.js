import { GraphQLNonNull, GraphQLString } from 'graphql';
import { loginToAccount } from './index';
import { accountType } from './account.schema';

const accountResolver = {
    account: {
        type: accountType,
        description: 'Get a jwt token for an account given an email and password',
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Email for the account'
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Password for the account'
            }
        },
        resolve: ((_, args) => loginToAccount(args.email, args.password))
    }
};

export default accountResolver;
