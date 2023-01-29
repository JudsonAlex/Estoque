import axios from "axios"
import { useState } from "react"
import { Produto } from "../../components/produtos/Produto.js"
import './pesquisa.css'

export function Pesquisa(){
    const[codigo, setCodigo] = useState('')
    const[descricao, setDescricao] = useState('')
    const[ produtos, setProdutos] = useState([])

    var dados = {
        cod: codigo,
        desc: descricao
    }

    async function consultar (){
        await axios.post('http://localhost:3333/listar', dados).then(e => {setProdutos(e.data); console.log(e.data)}).catch(err => {console.log(err)})   
    }
    
    return(
        <div id="pesquisa">
            <h1>Pesquisa</h1>
            <div >
                <input type="text" placeholder="codigo" onChange={e => {setCodigo(e.target.value)}}/>
                <input type="text" placeholder="descrição" onChange={e => setDescricao(e.target.value)}/>
                <button onClick={() => consultar()}>Pesquisar</button>
            </div>
            <div className="listagem" >

            <Produto itens={produtos} />
            </div>
        </div>
    )
}