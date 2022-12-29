const {DataTypes} = require("sequelize")
const sequelize = require("../database/conn")

module.exports = sequelize.define('product' , {

    id:{

        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    image_src:{
        type:DataTypes.TEXT,
    },
})