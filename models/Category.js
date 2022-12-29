const {DataTypes} = require("sequelize")
const sequelize = require("../database/conn")
module.exports = sequelize.define('category' , {

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false

    }

})