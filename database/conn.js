const {Sequelize} = require("sequelize")
const sequelize = new Sequelize({username:process.env.DB_USERNAME , password:process.env.DB_PASSWORD  , database:process.env.DATABASE  , dialect:"mysql" , host:process.env.DB_HOST,port:process.env.DB_PORT})
module.exports = sequelize