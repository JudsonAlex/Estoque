
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Dashboard } from "./pages/dashboard/Dashboard";
import {Cadastro} from "./pages/cadastro/Cadastro"
import { Pesquisa } from "./pages/pesquisa/Pesquisa";
import MenuLateral from "./components/menu/Menu";
import { Movimentacoes } from "./pages/movimentacoes/Move";

function Rotas(){
    return(
        <BrowserRouter>
        <div className="conteudo">
            <MenuLateral />
            <Routes>
                
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/pesquisa" element={<Pesquisa/>}/>
                <Route path="/movimentacoes" element={<Movimentacoes/>}/>
                
            </Routes>
        </div>
        </BrowserRouter>
    )
}

export default Rotas;