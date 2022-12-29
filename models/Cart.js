const  {DataTypes} = require("sequelize")
const sequelize = require("../database/conn")

module.exports = sequelize.define( 'cart' ,  {

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})