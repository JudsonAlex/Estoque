
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Dashboard } from "./pages/dashboard/Dashboard";
import {Entrada} from "./pages/entrada/Enter"
import {Exit} from "./pages/exit/Exit"
import {Cadastro} from "./pages/cadastro/Cadastro"
import { Pesquisa } from "./pages/pesquisa/Pesquisa";
import MenuLateral from "./components/menu/Menu";

function Rotas(){
    return(
        <BrowserRouter>
        <div className="conteudo">
            <MenuLateral />
            <Routes>
                
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/entrada" element={<Entrada/>}/>
                <Route path="/saida" element={<Exit/>}/>
                <Route path="/pesquisa" element={<Pesquisa/>}/>
                
            </Routes>
        </div>
        </BrowserRouter>
    )
}

export default Rotas;