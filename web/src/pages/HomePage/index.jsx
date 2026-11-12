import { Link } from 'react-router-dom'
import Header from '../../modules/Header'
import './style.css'


export default function HomePage() {
    return (
        <div className="home_page">
            <Header />

            <main className="home_container">
                <div className="home_intro">
                    <div className="home_badge">Симулятор электронных схем для учебных занятий</div>
                    <h1 className="home_title">Собирайте схемы и&nbsp;программируйте Arduino прямо в&nbsp;браузере</h1>
                    <p className="home_description">Перетаскивайте компоненты, соединяйте их проводами, пишите код на C++ и смотрите, как схема работает. Без паяльника и без риска что-то сжечь.</p>
                    <div className="home_actions">
                        <Link to="/login" className="sign_in_button">Начать работу</Link>
                        <Link to="/login" className="sign_in_class_button">Войти по коду класса</Link>
                    </div>
                </div>
            </main>

        </div>
    )
}
