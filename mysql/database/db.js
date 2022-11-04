//3------------------------------------------------------
// instalamos SEQUELIZE npm i sequelize mysq12

const { Sequelize } = require('sequelize');
const { database } = require('../config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    {
        host: database.host,
        dialect: 'mysql',
    }
);

module.exports = sequelize; // lo importamos en nuestro archivo principal app.js

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   })