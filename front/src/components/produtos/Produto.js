import { useState } from 'react';
import { ModalEdit } from '../modal/ModalEdit';
import './produto.css'

export function Produto(props){
    const itens = props.itens;
    const[ isOpen, setIsOpen] = useState(false)
    const [itemEdit, setItemEdit] = useState({})

    function dataFormat(datastring){
        var data = new Date(datastring)
        
        return data.toLocaleDateString()
    }

    const lista = itens.map(item =>
        <tr key={item.cod} className="prod">
            <td className='numbers'>{item.cod}</td>
            <td className='desc'>{item.desc}</td>
            <td className='numbers'>{item.qnt}</td>
            <td className='local'>{item.fab}</td>
            <td className='local'>{item.local}</td>
            <td className='med'>{<button onClick={() => {
                setItemEdit(i => i=item) 
                setIsOpen(!isOpen)
                // console.log(itemEdit)
            } }>Editar</button>}</td>
        </tr>
    )

    return (
        <table>
        <thead>
            <tr>
                <th className='numbers'>Cod</th>
                <th className='desc'>Descrição</th>
                <th className='numbers'>Quant</th>
                <th className='local'>Fabricante</th>
                <th className='local'>Localização</th>
                <th className='med'></th>
            </tr>
        </thead>
        <tbody className='lista'>
            
            {lista}
            
        </tbody>

        <ModalEdit dados={itemEdit} isOpen={isOpen} setIsOpen={setIsOpen}/>

    </table>
    );

}



