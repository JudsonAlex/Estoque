const database = require('../configDB.js');
const Produto = require('../models/produto.js')

async function criarDB() {
    try {
        const resultado = await database.sync();
        return resultado
        
    } catch (error) {
        console.log('Erro ao criar\n',error);
    }
}

module.exports = criarDB



