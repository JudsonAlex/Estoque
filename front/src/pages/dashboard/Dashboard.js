import axios from "axios";
import { useEffect, useState } from "react";

import './dashboard.css'
import { toast } from "react-toastify";



export function Dashboard() {

    return (
        <>
            <main>
                <Apresentation/>
            </main>
        </>
    )
}



function Apresentation() {
    const [countProdutos, setCountProdutos] = useState(0) 
    const [produtosZerados, setProdutosZerados] = useState(0) 

    useEffect(() => {
        axios.get("http://localhost:3333/home"
        ).then(dados =>{
            setCountProdutos(dados.data.countProducts)
            setProdutosZerados(dados.data.produtosZerados)
        }).catch(error => toast.error(`Erro ao conectar ao Banco <${error.message}>`, { autoClose: false })
        )


    }, [])
    return (
        <>
            <h1>Dashboard</h1>
            <h4>Visão geral do estoque</h4>
            <div className="statistcs">
                <div className="stats" id="cadastrados">{countProdutos} produtos cadastrados</div>
                <div className="stats" id="alerta">Em breve</div>
                <div className="stats" id="zero">{produtosZerados} produtos com estoque zerado</div>
            </div>
            <div>
                <div>Produtos com mais saída</div>
                <div>Produtos com menos saída</div>
            </div>
        </>

    )
}

