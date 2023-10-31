import { useState } from 'react'
import axios from 'axios'
import { ListaProdutos } from '../../components/listagem/ListaProduto'
import './move.css'
import { toast } from 'react-toastify'


export function Movimentacoes() {
    const [cod, setCod] = useState('')
    const [valor, setValor] = useState('')
    const [banco, setBanco] = useState({})
    const [lista, setlista] = useState([])


    const barras = document.getElementById("cod_barras")
    const qnt = document.getElementById('qnt')

    var dados = {
        cod: cod,
        qnt: ''
    }

    function addLista() {
        console.log(cod)
        console.log(valor)

        const temp_lista = [...lista]
        temp_lista.push({ cod: banco.cod, desc: banco.desc, qnt: valor })
        setlista(temp_lista)
        setCod('')
        setValor('')
        setBanco({})

    }

    async function consultar() {
        await axios.post('http://localhost:3333/listar', dados).then(e => { e.data.length > 0 ? setBanco(...e.data) : toast.warning("esse codigo nao existe") }).catch(err => { toast.error(`Erro ao conectar ao banco ${err.message}`) })
    }

    function removeOfList(id) {
        setlista(lista.filter((element, index) => index !== id))

    }

    async function next(e) {
        if (e.target.id === "cod_barras") {
            if (e.key === 'Enter') {
                consultar()

                qnt.focus()
            }
        }
        else if (e.target.id === "qnt") {
            if (e.key === 'Enter') {
                addLista()

                barras.focus() //troccar por add na lista
            }
        }
    }


    return (
        <div id="move">
            <div id="inputs">
                <input
                    value={cod}
                    type="text"
                    id='cod_barras'
                    placeholder="Cod. Barras"
                    onKeyDown={next}
                    onChange={e => setCod(e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))}
                />

                <input
                    disabled={cod? false: true}
                    value={valor}
                    type="text"
                    id="qnt"
                    onInput={e => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                    placeholder="Quantidade"
                    onKeyDown={next}
                    onChange={e => setValor(e.target.value)}
                />
                <button onClick={addLista}>adicionar</button>
            </div>

            <section id="info" >
                <section id='detalhes'>
                    <div className='detalhes'><div className='label'>descricao</div> <span className='dados_banco'>{banco ? banco.desc : ''}</span></div>
                    <div className='detalhes'><div className='label'>fabricante</div> <span className='dados_banco'>{banco ? banco.fab : ''}</span></div>
                    <div className='detalhes'><div className='label'>quantidade</div> <span className='dados_banco'>{banco ? banco.qnt : ''}</span></div>
                    <div className='detalhes'><div className='label'>local</div> <span className='dados_banco'>{banco ? banco.local : ''}</span></div>
                </section>
                <section id='imagem'>
                    <img alt="imagem produto" src="https://www.luiztools.com.br/wp-content/uploads/2016/06/logo.jpg"></img>
                </section>
            </section>


            <ListaProdutos dados={lista} remove={removeOfList} limpa={setlista} />
        </div>
    )
}