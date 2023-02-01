const {Sequelize} = require("sequelize")
const sequelize = new Sequelize({username:"root" , password:""  , database:"e-commerce"  , dialect:"mysql" , host:"localhost"})
module.exports = sequelize