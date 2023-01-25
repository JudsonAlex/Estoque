import './produto.css'

export function Produto(props){
    const itens = props.itens;

  

    function dataFormat(datastring){
        var data = new Date(datastring)
        
        return data.toLocaleDateString()
    }

    const lista = itens.map(item =>
        <tr key={item.cod} className="prod">
            <td>{item.cod}</td>
            <td>{item.desc}</td>
            <td>{item.local}</td>
            <td>{item.fab}</td>
            <td>{item.qnt}</td>
            <td>{dataFormat(item.createdAt)}</td>
            <td>{dataFormat(item.updatedAt)}</td>
        </tr>
    )

    
    return (
        <table>
        <thead>
            <tr>
                <th>codigo</th>
                <th>Descrição</th>
                <th>Localização</th>
                <th>Fabricante</th>
                <th>quantidade</th>
                <th>Criado</th>
                <th>Editado</th>
            </tr>
        </thead>
        <tbody>
            
            {lista}
            
        </tbody>

    </table>
    );

}



