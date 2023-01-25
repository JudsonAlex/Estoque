import axios from "axios";
import { useEffect } from "react";

import './dashboard.css'

 export function Dashboard(){
     useEffect(() =>{
        axios.get("http://localhost:3333").then(console.log("ok")).catch(console.log("opps!!"))
     },[])

    return(
        <>
            <main>
                <Apresentation />
            </main>
        </>
    )
}



function Apresentation(){
    return(
        <>
            <h1>Dashboard</h1>
            <h4>Visão geral do estoque</h4>
            <div className="statistcs">
                <div className="stats" id="cadastrados">42 produtos cadastrados</div>
                <div className="stats" id="alerta">42 produtos com estoque baixo</div>
                <div className="stats" id="zero">42 produtos com estoque zerado</div>
            </div>
            <div>
                <div>Produtos com mais saída</div>
                <div>Produtos com menos saída</div>
            </div>
        </>

    )
}

