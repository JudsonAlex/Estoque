import { Link } from "react-router-dom"
import { useState } from "react"
import "./cadastro.css"
import axios from 'axios'




export function Cadastro(){

    

    const [codigo, setCodigo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [quantidade, setQuantidade] = useState('')

    var dados = {
        cod: codigo,
        desc: descricao,
        local: localizacao,
        fab: fabricante,
        qnt: quantidade
    }

    function cadastrar(){
        console.log(codigo)
        axios.post('http://localhost:3333/cadastrar',dados
        ).then(e => console.log('enviado com sucesso', e.data)).catch(e => console.log('Erro ao salvar', e))

    }

    function cancelar(){
        const btnCancel = document.getElementById('cadastro')
        

        btnCancel.addEventListener('submit', e =>{
            e.preventDefault()
        })        
    }

    function salvar(){
        const btnSave = document.getElementById('cadastro')
        btnSave.addEventListener('submit', e =>{
            e.preventDefault()
        })
        cadastrar()
    }


    return (
        <form id="cadastro">
            <h1>Cadastro de podutos</h1>
            <fieldset>
                <legend>Dados</legend>

                <div className="label-float">
                    <input name="cadastro" className="input" placeholder=" " onChange={(e) => setCodigo(e.target.value)}/>
                    <label htmlFor="cadastro">codigo</label>
                </div>

                <div className="label-float">
                    <input name="descricao" className="input" placeholder=" " onChange={(e) => setDescricao(e.target.value)}/>
                    <label htmlFor="descricao">descrição</label>
                </div>

                <div className="label-float">
                    <input name="localizacao" className="input" placeholder=" " onChange={(e) => setLocalizacao(e.target.value)}/>
                    <label htmlFor="localizacao">localização</label>
                </div>

                <div className="label-float">
                    <input name="fabricante" className="input" placeholder=" " onChange={(e) => setFabricante(e.target.value)}/>
                    <label htmlFor="fabricante">fabricante</label>
                </div>

                <div className="label-float">
                    <input name="quantidade" className="input" placeholder=" " onChange={(e) => setQuantidade(e.target.value)}/>
                    <label htmlFor="quantidade">quantidade</label>
                </div>

            </fieldset>
            <div id="btn">
                <Link to="/"><button className="cadActions" id="cancel" onClick={cancelar}>Cancelar</button></Link>
                <button className="cadActions" id="salvar" onClick={salvar}>Salvar</button>
            </div>
            
        </form>     
    )
}

