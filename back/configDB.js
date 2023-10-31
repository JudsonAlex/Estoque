const Sequelize = require('sequelize')
const database = new Sequelize({
    dialect: "sqlite",
    storage: "./database/sqlite.db"
})

module.exports=  database