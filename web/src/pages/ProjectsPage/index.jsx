import { Link } from 'react-router-dom'
import AppHeader from '../../modules/AppHeader'
import './style.css'

export default function ProjectsPage() {
    return (
        <div className="projects_page">
            <AppHeader />

            <div className="projects_body">
                <aside className="projects_sidebar">
                    <button type="button" className="projects_sidebar_item projects_sidebar_item_active">Все проекты</button>
                    <button type="button" className="projects_sidebar_item">Задания</button>
                    <button type="button" className="projects_sidebar_item">Общие со мной</button>
                    <button type="button" className="projects_sidebar_item">Корзина</button>
                    <div className="projects_sidebar_title">МОИ КЛАССЫ</div>
                    <span className="projects_sidebar_empty">Вы пока не состоите в классах</span>
                </aside>

                <main className="projects_main">
                    <div className="projects_toolbar">
                        <h1 className="projects_title">Мои проекты</h1>
                        <div className="projects_spacer"></div>
                        <label htmlFor="sort" className="projects_sort_label">Сортировка</label>
                        <select id="sort" className="projects_sort">
                            <option>Недавно изменённые</option>
                            <option>По названию</option>
                        </select>
                        <Link to="/sandbox" className="projects_new_button">+ Новая схема</Link>
                    </div>

                    <div className="projects_empty">
                        <span className="projects_empty_title">Проектов пока нет</span>
                        <span className="projects_empty_text">Создайте первую схему, и она появится здесь</span>
                    </div>
                </main>
            </div>
        </div>
    )
}
