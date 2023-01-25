import database from '../configDB.js';
import {Produto} from '../models/produto.js'

export async function criarDB() {
    try {
        const resultado = await database.sync();
        return resultado
        
    } catch (error) {
        console.log('Erro ao criar\n',error);
    }
}



