const {DataTypes} = require("sequelize")
const sequelize = require("../database/conn")

module.exports = sequelize.define('user' , {

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },

    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    Role:{
        type:DataTypes.ENUM(['Admin' , 'Customer']),
        defaultValue:'Customer'
    }
})