import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './data/database.schema';
import config from './config/index';
import { connect } from './db/index';

const app = express();

export const startServer = async () => {
    try {
        await connect();
        app.use('/graphql', graphqlHTTP({
            schema,
            graphiql: true
        }));
        app.listen(3000, () => {
            console.log(`${config.name} is running on port: ${config.port}`);
        });
    } catch (err) {
        console.log(err, 'Failed to start server')
    }
};

startServer();

export default startServer;
