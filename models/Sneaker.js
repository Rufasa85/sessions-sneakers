const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sneaker extends Model {}

Sneaker.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull:false
    },
    color: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize
});

module.exports=Sneaker