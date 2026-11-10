import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import "./style.css"

export default function Header(){
    return(
        <header className="header">
            <Link to="/" className="header_logo">
                <img src={logo} width="28" height="28" alt="" />
                CIRCUIT.LAB
            </Link>
            <nav className="header_nav">
                <a href="#features">Возможности</a>
                <a href="#features">Для преподавателей</a>
                <a href="#features">Примеры схем</a>
            </nav>
            <div className="header_spacer"></div>
            <Link to="/login" className="header_login">Войти</Link>
            <Link to="/login" className="header_register">Регистрация</Link>
        </header>
    )
}
