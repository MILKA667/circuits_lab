import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import ProjectsPage from '../pages/ProjectsPage'
import SandboxPage from '../pages/SandboxPage'


function Layout(){
    return(
        Header
    )
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/projects" element={<ProjectsPage/>}/>
                    <Route path="/sandbox" element={<SandboxPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App