import axios from "axios"
import { useState } from "react"
import { Produto } from "../../components/produtos/Produto.js"


export function Pesquisa(){
    const[codigo, setCodigo] = useState('')
    const[descricao, setDescricao] = useState('')
    const[ produtos, setProdutos] = useState([])

    var dados = {
        cod: codigo,
        desc: descricao
    }

    var lista = [1,2,3,4,5,6,7]

    async function consultar (){
        await axios.post('http://localhost:3333/listar', dados).then(e => {setProdutos(e.data); console.log(e.data)}).catch(err => {console.log(err)})   
    }
    
    return(
        <div>
            <input type="text" placeholder="codigo" onChange={e => {setCodigo(e.target.value)}}/>
            <input type="text" placeholder="descrição" onChange={e => setDescricao(e.target.value)}/>
            <button onClick={() => consultar()}>Pesquisar</button>
            <div className="listagem" >

            <Produto itens={produtos} />
            </div>
        </div>
    )
}