
import {Link} from 'react-router-dom'
import './menu.css'
import {MdSpaceDashboard} from 'react-icons/md'
import { ImEnter, ImExit, ImSearch, ImPaste } from 'react-icons/im'


function MenuLateral(){
    return(
        <nav className="nav">
            <Link className="links" to="/"><MdSpaceDashboard size={24} />DASHBOARD</Link>
            <Link className="links" to="/cadastro"><ImPaste size={24}/>CADASTRO</Link>
            <Link className="links" to="/entrada"><ImEnter size={24}/>ENTRADA</Link>
            <Link className="links" to="/saida"><ImExit size={24}/>SAIDA</Link>
            <Link className="links" to="/pesquisa"><ImSearch size={24}/>PESQUISAR</Link>
        </nav>
    )
}
export default MenuLateral;