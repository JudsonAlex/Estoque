import './lista.css'
import axios from 'axios'


export function ListaProdutos({ dados, remove, limpa}) {

    async function entrada(item){
        console.log(dados)
        await axios.put("http://localhost:3333/entrada", dados).then(e => console.log("Sucesso =>",e.data)).catch(e => console.log("Erro"))
        limpa([])
    }

    return (
        <div className='l'>
            <div className="list">
                <table>
                    <thead>
                        <tr>
                            <th>cod.</th>
                            <th>descrição</th>
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
                    </tbody>
                </table>
            </div>
            <section id='btn'>
                <button id='entrada' onClick={entrada}>Entrada</button>
                <button id='saida'>Saída</button>
            </section>
        </div>
    )
}