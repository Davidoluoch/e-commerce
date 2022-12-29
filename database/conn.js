const {Sequelize} = require("sequelize")
const { ModuleDetectionKind } = require("typescript")
const sequelize = new Sequelize({username:process.env.DB_USERNAME , password:process.env.DB_PASSWORD  , database:process.env.DATABASE  , dialect:"mysql" , host:"localhost"})
module.exports = sequelize