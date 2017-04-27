import fs from 'fs';
import path from 'path';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './data/database.schema';
import config from './config/index';
import { connect } from './db/index';

connect()
    .then(() => {
        const app = express();
        app.use('/graphql', graphqlHTTP({
            schema,
            graphiql: true
        }));
        app.listen(config.port, () => {
            console.log(`${config.name} is running on port: ${config.port}`);
        });
    })
    .catch(err => console.log(err, 'Failed to start server'));
