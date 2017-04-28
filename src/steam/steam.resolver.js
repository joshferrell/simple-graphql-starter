import { GraphQLNonNull, GraphQLID } from 'graphql';
import { getSteamId } from './index';
import { steamType } from './steam.schema';

const steamResolver = {
    steam: {
        type: steamType,
        description: 'Get a single steam account by the vanity url',
        args: {
            vanityUrl: {
                type: new GraphQLNonNull(GraphQLID),
                description: 'Vanity url for an account (usually the username)'
            }
        },
        resolve: ((_, { vanityUrl }) =>
            getSteamId(vanityUrl)
                .then(steamId => ({ steamId, vanityUrl }))
        )
    }
};

export default steamResolver;
