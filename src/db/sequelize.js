import Sequelize from 'sequelize';
import config from '../config/index';

const {
    host,
    port,
    dbname,
    user,
    password
} = config.sequelize;

const sqlConnection = new Sequelize(dbname, user, password, {
    host,
    port: 5432,
    dialect: 'postgres'
});

export default sqlConnection;
