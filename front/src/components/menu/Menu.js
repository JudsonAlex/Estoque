
import {Link} from 'react-router-dom'
import './menu.css'
import {MdSpaceDashboard} from 'react-icons/md'
import { ImEnter, ImSearch, ImPaste } from 'react-icons/im'


function MenuLateral(){
    return(
        <nav className="nav">
            <Link className="links" to="/"><MdSpaceDashboard size={24} />DASHBOARD</Link>
            <Link className="links" to="/cadastro"><ImPaste size={24}/>CADASTRO</Link>
            <Link className="links" to="/movimentacoes"><ImEnter size={24}/>Movimentações</Link>
            <Link className="links" to="/pesquisa"><ImSearch size={24}/>PESQUISAR</Link>
        </nav>
    )
}
export default MenuLateral;