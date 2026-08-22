import { useState, useEffect } from 'react'
import { TodoProvider } from './context/TodoContext'
import Sidebar from './components/layout/Sidebar'
import MainPanel from './components/layout/MainPanel'
import { Sun, Moon } from 'lucide-react'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('taskflow-theme')
    return saved || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('taskflow-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
    <TodoProvider>
      <div className="app" data-theme={theme}>
        <div className="app-container">
          <Sidebar />
          <MainPanel />
        </div>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </TodoProvider>
  )
}

export default App