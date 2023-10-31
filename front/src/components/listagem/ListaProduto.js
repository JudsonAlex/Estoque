import { toast } from 'react-toastify'
import './lista.css'
import axios from 'axios'
import { useEffect, useRef } from 'react'


export function ListaProdutos({ dados, remove, limpa}) {
    const divRef = useRef(null)

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    }, [dados])

    async function entrada(){
        console.log(dados)
        await axios.put("http://localhost:3333/entrada", dados).then(e => toast.success("Salvo com sucesso!")).catch(e => toast.error(`Erro ao dar entrada ${e.message}`))
        limpa([])
    }

    async function saida(){
        console.log(dados)
        await axios.put("http://localhost:3333/saida", dados).then(e => toast.success("Salvo com sucesso!")).catch(e => toast.error(`Erro ao dar saida ${e.message}`))
        limpa([])
    }

    return (
        <div className='l'>
            <div className="list">
                <table>
                    <thead>
                        <tr>
                            <th>cod.</th>
                            <th className='descricao'>descrição</th>
                            <th>quantidade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((item, index) =>
                            <tr key={index} className="prod">
                                <td>{item.cod}</td>
                                <td className='descricao'>{item.desc}</td>
                                <td>{item.qnt}</td>
                                <td><button onClick={() => remove(index)} >excluir</button></td>

                            </tr>
                        )}
                        <div ref={divRef}></div>
                    </tbody>
                </table>
            </div>
            <section id='btn'>
                <button id='entrada' onClick={entrada}>Entrada</button>
                <button id='saida' onClick={saida}>Saída</button>
            </section>
        </div>
    )
}