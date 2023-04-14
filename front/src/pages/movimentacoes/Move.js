import {useState} from 'react'
import axios from 'axios'
import { ListaProdutos } from '../../components/listagem/ListaProduto'
import './move.css'

export function Movimentacoes() {
    const [cod, setCod] = useState('')
    const [valor, setValor] =useState('')
    const [banco, setBanco] = useState({})
    const [lista, setlista] = useState([])


    const barras = document.getElementById("cod_barras")
    const qnt = document.getElementById('qnt')

    var dados = {
        cod: cod,
        qnt: ''
    }

    function addLista(){
        console.log(cod)
        console.log(valor)
        
        const temp_lista = [...lista]
        temp_lista.push({cod: banco.cod, desc: banco.desc, qnt: valor})
        setlista(temp_lista)
        setCod('')
        setValor('')
        
    }
    
    async function consultar (){
        await axios.post('http://localhost:3333/listar', dados).then(e => {e.data.length > 0 ? setBanco(...e.data): alert("opaaaaaaa")}).catch(err => {console.log(err)})   
    }

    function remove(id){
        setlista(lista.filter((element, index) => index !== id))
        
    }
    
    async function next(e){
        if(e.target.id === "cod_barras"){
            if(e.key === 'Enter'){
                consultar()
                
                qnt.focus()
            }
        }
        else if(e.target.id === "qnt"){
            if(e.key === 'Enter'){
                addLista()
                
                barras.focus() //troccar por add na lista
            }
        }
    }


    return(
        <div id="move">
            <div id="inputs">
                <input
                value={cod}
                    type="text"
                    id='cod_barras'
                    placeholder="Cod. Barras"
                    onKeyPress={next}
                    onChange={e => setCod(e.target.value)}
                />

                <input
                    value={valor}
                    type="text" 
                    id="qnt" 
                    placeholder="Quantidade" 
                    onKeyPress={next}
                    onChange={e => setValor(e.target.value)}
                />
                <button onClick={addLista}>adicionar</button>
            </div>

            <section id="info" >
                <section id='detalhes'>
                <div className='detalhes'><div className='label'>descricao</div> <span className='dados_banco'>{banco? banco.desc : ''}</span></div>
                <div className='detalhes'><div className='label'>fabricante</div> <span className='dados_banco'>{banco? banco.fab : ''}</span></div>
                <div className='detalhes'><div className='label'>quantidade</div> <span className='dados_banco'>{banco? banco.qnt : ''}</span></div>
                <div className='detalhes'><div className='label'>local</div> <span className='dados_banco'>{banco? banco.local : ''}</span></div>
                </section>
                <section id='imagem'>
                    <img alt="imagem produto" src="https://www.luiztools.com.br/wp-content/uploads/2016/06/logo.jpg"></img>
                </section>
            </section>
            

            <ListaProdutos dados={lista} remove={remove} limpa={setlista} />
        </div>
    )
}