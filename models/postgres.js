require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: 'postgres',
});
module.exports = sequelize