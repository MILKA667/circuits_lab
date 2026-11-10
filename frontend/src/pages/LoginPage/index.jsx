import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoWhite from '../../assets/icons/logo-white.svg'
import authPattern from '../../assets/images/auth-pattern.svg'
import './style.css'

function LoginForm() {
    return (
        <form className="auth_form" onSubmit={(e) => e.preventDefault()}>
            <h1 className="auth_title">С возвращением</h1>

            <div className="auth_field">
                <label htmlFor="l-email" className="auth_label">Эл. почта или логин</label>
                <input id="l-email" className="auth_input" placeholder="student@university.ru" />
            </div>

            <div className="auth_field">
                <div className="auth_label_row">
                    <label htmlFor="l-pass" className="auth_label">Пароль</label>
                    <a href="#" className="auth_link">Забыли пароль?</a>
                </div>
                <input id="l-pass" type="password" className="auth_input" />
            </div>

            <Link to="/projects" className="auth_submit">Войти</Link>

            <div className="auth_divider">
                <div className="auth_divider_line"></div>
                или
                <div className="auth_divider_line"></div>
            </div>

            <div className="auth_field">
                <label htmlFor="l-code" className="auth_label">Код класса от преподавателя</label>
                <div className="auth_code_row">
                    <input id="l-code" className="auth_input auth_input--code" placeholder="Например, XK4-9QP" />
                    <button type="button" className="auth_secondary_button">Присоединиться</button>
                </div>
            </div>
        </form>
    )
}

function RegisterForm() {
    const [role, setRole] = useState('student')

    return (
        <form className="auth_form auth_form--register" onSubmit={(e) => e.preventDefault()}>
            <h1 className="auth_title">Создать аккаунт</h1>

            <div className="auth_field">
                <div className="auth_label">Я</div>
                <div className="auth_grid">
                    <button
                        type="button"
                        className={`auth_role ${role === 'student' ? 'auth_role--active' : ''}`}
                        onClick={() => setRole('student')}
                    >
                        Студент
                    </button>
                    <button
                        type="button"
                        className={`auth_role ${role === 'teacher' ? 'auth_role--active' : ''}`}
                        onClick={() => setRole('teacher')}
                    >
                        Преподаватель
                    </button>
                </div>
            </div>

            <div className="auth_grid">
                <div className="auth_field">
                    <label htmlFor="r-name" className="auth_label">Имя</label>
                    <input id="r-name" className="auth_input" />
                </div>
                <div className="auth_field">
                    <label htmlFor="r-last" className="auth_label">Фамилия</label>
                    <input id="r-last" className="auth_input" />
                </div>
            </div>

            <div className="auth_field">
                <label htmlFor="r-email" className="auth_label">Эл. почта</label>
                <input id="r-email" type="email" className="auth_input" />
            </div>

            <div className="auth_field">
                <label htmlFor="r-pass" className="auth_label">Пароль</label>
                <input id="r-pass" type="password" className="auth_input" />
                <span className="auth_hint">Не меньше 8 символов</span>
            </div>

            <Link to="/projects" className="auth_submit">Зарегистрироваться</Link>
        </form>
    )
}

export default function LoginPage() {
    const [tab, setTab] = useState('login')

    return (
        <div className="auth_page">
            <aside className="auth_aside">
                <img src={authPattern} className="auth_aside_pattern" alt="" />

                <Link to="/" className="auth_logo">
                    <img src={logoWhite} width="28" height="28" alt="" />
                    CIRCUIT.LAB
                </Link>

                <div className="auth_aside_text">
                    <div className="auth_aside_title">Лаборатория электроники, которая всегда открыта</div>
                    <div className="auth_aside_description">Все ваши схемы и скетчи сохраняются в аккаунте. Продолжайте работу с любого компьютера.</div>
                </div>
            </aside>

            <main className="auth_main">
                <div className="auth_card">
                    <div className="auth_tabs">
                        <button
                            type="button"
                            className={`auth_tab ${tab === 'login' ? 'auth_tab--active' : ''}`}
                            onClick={() => setTab('login')}
                        >
                            Вход
                        </button>
                        <button
                            type="button"
                            className={`auth_tab ${tab === 'register' ? 'auth_tab--active' : ''}`}
                            onClick={() => setTab('register')}
                        >
                            Регистрация
                        </button>
                    </div>

                    {tab === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
            </main>
        </div>
    )
}
