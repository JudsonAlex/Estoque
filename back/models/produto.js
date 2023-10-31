const Sequelize = require('sequelize')
//const Sequelize = require('sequelize')
const database = require('../configDB.js')

const Produto =  database.define('produto',{
    cod: {
        type: Sequelize.INTEGER,
        autoincrement: false,
        allowNull: false,
        primaryKey: true
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    local: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fab: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qnt: {
        type: Sequelize.FLOAT,
        allowNull: false
    }


})

module.exports = Produto