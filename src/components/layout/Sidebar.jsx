import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTodo } from '../../hooks/useTodo'
import { 
  LayoutDashboard,
  Folder,
  FolderPlus,
  X,
  Check,
  ListTodo,
  Plus,
  Settings,
  LogOut
} from 'lucide-react'
import './Sidebar.css'

function Sidebar() {
  const { state, dispatch, getProjectCount } = useTodo()
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      dispatch({
        type: 'ADD_PROJECT',
        payload: { name: newProjectName.trim() },
      })
      setNewProjectName('')
      setIsAddingProject(false)
    }
  }

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch({ type: 'DELETE_PROJECT', payload: { id } })
    }
  }

  const totalTasks = state.projects.reduce((acc, p) => acc + p.todos.length, 0)

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <ListTodo size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1>TaskFlow</h1>
            <span className="logo-badge">v2.0</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-label">TASKS</div>
          <button
            className={`nav-item ${state.activeProjectId === 'all' ? 'active' : ''}`}
            onClick={() =>
              dispatch({ type: 'SET_ACTIVE_PROJECT', payload: { id: 'all' } })
            }
          >
            <LayoutDashboard size={18} />
            <span className="nav-label">All Tasks</span>
            <span className="nav-badge">{totalTasks}</span>
            {state.activeProjectId === 'all' && (
              <div className="nav-active-indicator" />
            )}
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-section-label">LISTS</div>
          {state.projects.map((project) => (
            <div key={project.id} className="nav-item-wrapper">
              <button
                className={`nav-item ${state.activeProjectId === project.id ? 'active' : ''}`}
                onClick={() =>
                  dispatch({
                    type: 'SET_ACTIVE_PROJECT',
                    payload: { id: project.id },
                  })
                }
              >
                <Folder size={18} />
                <span className="nav-label">{project.name}</span>
                <span className="nav-badge">{getProjectCount(project.id)}</span>
                {state.activeProjectId === project.id && (
                  <div className="nav-active-indicator" />
                )}
              </button>
              {project.id !== 'default' && (
                <button
                  className="nav-delete"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          <AnimatePresence>
            {isAddingProject ? (
              <motion.div
                className="add-project-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <input
                  type="text"
                  placeholder="List name..."
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
                  autoFocus
                />
                <div className="form-actions">
                  <button className="btn-add" onClick={handleAddProject}>
                    <Check size={14} />
                    Add
                  </button>
                  <button className="btn-cancel" onClick={() => setIsAddingProject(false)}>
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                className="add-project-btn"
                onClick={() => setIsAddingProject(true)}
              >
                <Plus size={16} />
                Add List
              </button>
            )}
          </AnimatePresence>
        </div>

        <div className="nav-footer">
          <div className="nav-section">
            <div className="nav-section-label">SETTINGS</div>
            <button className="nav-item" onClick={() => alert('Settings coming soon!')}>
              <Settings size={18} />
              <span className="nav-label">Settings</span>
            </button>
            <button className="nav-item" onClick={() => alert('Sign out coming soon!')}>
              <LogOut size={18} />
              <span className="nav-label">Sign out</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar