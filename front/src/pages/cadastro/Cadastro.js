import { Link } from "react-router-dom"
import { useState } from "react"
import "./cadastro.css"
import axios from 'axios'
import { toast } from "react-toastify"
const XLSX = require("xlsx")


export function Cadastro(){

    const [codigo, setCodigo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [quantidade, setQuantidade] = useState('')

    var dados = [{
        cod: codigo,
        desc: descricao,
        local: localizacao,
        fab: fabricante,
        qnt: quantidade
    }]

    function importarExcel(){
        const form = document.getElementById('cadastro')
        form.addEventListener('submit', e =>{
            e.preventDefault()
        })
        const inputFile = document.getElementById('arquivo')
        const arquivo = inputFile.files[0]

        const reader = new FileReader()
            reader.onload = function(){
            const arrayBuffer = reader.result

            const planilha = XLSX.read(arrayBuffer, { type: 'array' });
            const sheets = planilha.SheetNames;
            console.log(sheets)
            const sheet = sheets[0];
            const dados = XLSX.utils.sheet_to_json(planilha.Sheets[sheet]);
            console.log(dados)
            cadastrar(dados)
            }

            reader.readAsArrayBuffer(arquivo);

        

        
        
    }

    async function cadastrar(lista){
        //========= método 1 ===============
        const id = toast.loading("Salvando...",{
            
            draggable: true
        })

        axios.post('http://localhost:3333/cadastrar',lista
        ).then(e =>{ 
            toast.update(id,{render: "Salvo com Sucesso!", autoClose: true, type: "success", isLoading: false, closeOnClick: true}); console.log(e)}
        ).catch(e => {toast.update(id,{render: `Falha ao salvar ${e.response.data}`,autoClose: true,  type: "error", isLoading: false, closeOnClick: true});console.log(e)})

        // ============ Método 2 ===============
        // await axios.post('http://localhost:3333/cadastrar',lista).then(e =>{
        //     toast.success("Salvo com sucesso!")
        //     console.log(e)}
        // ).catch(e =>
        //    { toast.error("Erro ao salvar!!")
        //     console.log(e)}
        // )

        // =====  Método 3 =====
        // toast.promise(
        //     axios.post('http://localhost:3333/cadastrar',lista).then(e => console.log("uhul")).catch(e => console.log("opss")),
        //     {
        //         pending: 'Salvando',
        //         success: 'Salvo com sucesso',
        //         error: `Erro ao salvar`
        //       }
        // )
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
        cadastrar(dados)
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

            <div className="import">
                <input type="file" name="xlsx" id="arquivo"  onChange={importarExcel}/>
            </div>
            
        </form>     
    )
}

