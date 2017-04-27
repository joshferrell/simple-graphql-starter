import { GraphQLNonNull } from 'graphql';
import { accountType, accountInputType } from './account.schema';
import { createAccount } from './index';

const accountMutation = {
    createAccount: {
        type: accountType,
        args: {
            account: {
                type: new GraphQLNonNull(accountInputType)
            }
        },
        resolve: (_, args) => createAccount(args.account.email, args.account.password)
    }
};

export default accountMutation;
