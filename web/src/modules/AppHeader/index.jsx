import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import { getUser } from '../../shared/auth'
import './style.css'

function getInitials(user) {
    if (!user) return ''
    return `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()
}

export default function AppHeader() {
    const user = getUser()

    return (
        <header className="app_header">
            <Link to="/" className="app_header_logo">
                <img src={logo} width="26" height="26" alt="" />
                CIRCUIT.LAB
            </Link>
            <nav className="app_header_nav">
                <NavLink to="/projects">Проекты</NavLink>
                <button type="button">Классы</button>
                <button type="button">Примеры</button>
            </nav>
            <div className="app_header_spacer"></div>
            <label htmlFor="top-search" className="visually_hidden">Поиск по проектам</label>
            <input id="top-search" className="app_header_search" placeholder="Поиск по проектам" />
            <button type="button" className="app_header_avatar" aria-label="Профиль">
                {getInitials(user)}
            </button>
        </header>
    )
}
