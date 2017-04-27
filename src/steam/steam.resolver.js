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
        resolve: ((_, args) => getSteamId)
    }
}
