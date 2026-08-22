import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTodo } from '../../hooks/useTodo'
import { useFilteredTodos } from '../../hooks/useFilteredTodos'
import TodoList from '../todos/TodoList'
import TodoFilters from '../todos/TodoFilters'
import TodoFormModal from '../modals/TodoFormModal'
import EmptyState from '../common/EmptyState'
import { Plus } from 'lucide-react'
import './MainPanel.css'

function MainPanel() {
  const { state, activeProject, allTodos } = useTodo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' })
  const [sortBy, setSortBy] = useState('createdAt')

  // Get the current todos based on active project
  const getCurrentTodos = () => {
    if (activeProject?.id === 'all') {
      return allTodos
    }
    if (activeProject) {
      return activeProject.todos || []
    }
    return []
  }

  const todos = getCurrentTodos()
  const filteredTodos = useFilteredTodos(todos, filters, sortBy)

  const handleEditTodo = (todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTodo(null)
  }

  const getProjectTitle = () => {
    if (activeProject?.id === 'all') return 'All Tasks'
    return activeProject?.name || 'Tasks'
  }

  // Get the actual project ID for adding todos
  const getProjectId = () => {
    if (activeProject?.id === 'all') {
      // If "All Tasks" is selected, use the first project or 'default'
      return state.projects[0]?.id || 'default'
    }
    return activeProject?.id || 'default'
  }

  return (
    <main className="main-panel">
      <div className="main-header">
        <div>
          <h2>{getProjectTitle()}</h2>
          <p className="todo-count">{todos.length} tasks</p>
        </div>
        <button className="add-todo-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <TodoFilters
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="todo-content">
        {filteredTodos.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            description="Get started by creating your first task"
            actionLabel="Create Task"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <TodoList
            todos={filteredTodos}
            onEdit={handleEditTodo}
            projectId={getProjectId()}
          />
        )}
      </div>

      <TodoFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTodo={editingTodo}
        projectId={getProjectId()}
      />
    </main>
  )
}

export default MainPanel