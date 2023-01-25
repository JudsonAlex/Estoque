import axios from "axios"
import { useState } from "react"
import '../entrada/enter.css'



export function Exit() {
    
    const [cod, setCod] = useState('')
    const [qnt, setQtd] = useState(1)

    var dados = {
        cod: cod,
        qnt: qnt
    
    }

    function adicionar(){
        const btnAdd = document.getElementById('add')
        btnAdd.addEventListener('submit', e => {
            e.preventDefault()
        })
        console.log(dados)
        axios.put("http://localhost:3333/saida", dados).then(
            e =>console.log('adiciionado com sucesso', e.data)
        ).catch(
            e => console.log('Erro ao adicionar', e)
        )
    }

    return (
        <div id="entrada">
            <h1>Saída</h1>
            <form id="add">
                <fieldset>
                    <legend>Dados</legend>
                    <div className="label-float">
                        <input type="text" className="input" name="cod" placeholder=" " onChange={e => setCod(e.target.value)}/>
                        <label htmlFor="cod">Codigo</label>
                    </div>
                    <div className="label-float">
                        <input type="text" className="input" name="qtd" placeholder=" " onChange={e => setQtd(e.target.value)}/>
                        <label htmlFor="qtd">Quantidade</label>
                    </div>
                    <button onClick={adicionar} >Adicionar</button>
                </fieldset>
            </form>

        </div>


    )
}