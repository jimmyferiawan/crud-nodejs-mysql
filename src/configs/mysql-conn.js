const { Sequelize } = require('sequelize')
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME || 'pos', process.env.DB_USER || 'root', process.env.DB_PASS || '', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: (...msg) => console.log(msg),
})

module.exports = {sequelize}