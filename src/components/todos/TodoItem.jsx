import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTodo } from '../../hooks/useTodo'
import { formatDate, isOverdue } from '../../utils/dateUtils'
import PriorityBadge from '../common/PriorityBadge'
import { Pencil, Trash2, Calendar, Folder, CheckCircle2, Circle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import './TodoItem.css'

function TodoItem({ todo, onEdit, projectId }) {
  const { dispatch } = useTodo()
  const [isExpanded, setIsExpanded] = useState(false)
  const overdue = todo.status !== 'done' && isOverdue(todo.dueDate)

  const handleToggle = () => {
    dispatch({
      type: 'TOGGLE_STATUS',
      payload: { id: todo.id, projectId: projectId || todo.projectId },
    })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({
        type: 'DELETE_TODO',
        payload: { id: todo.id, projectId: projectId || todo.projectId },
      })
    }
  }

  const getStatusIcon = () => {
    switch (todo.status) {
      case 'done':
        return <CheckCircle2 size={16} className="status-icon done" />
      case 'in-progress':
        return <Clock size={16} className="status-icon progress" />
      default:
        return <Circle size={16} className="status-icon todo" />
    }
  }

  return (
    <motion.div
      className={`todo-item ${todo.status}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="todo-main">
        <div className="todo-checkbox" onClick={handleToggle}>
          <input
            type="checkbox"
            checked={todo.status === 'done'}
            onChange={handleToggle}
          />
        </div>

        <div className="todo-content">
          <div className="todo-header">
            <div className="todo-title-wrapper">
              {getStatusIcon()}
              <h3 className={`todo-title ${todo.status === 'done' ? 'completed' : ''}`}>
                {todo.title}
              </h3>
            </div>
            <div className="todo-actions">
              <button className="expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <button className="edit-btn" onClick={() => onEdit(todo)}>
                <Pencil size={14} />
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <div className="todo-meta">
            <PriorityBadge priority={todo.priority} />
            <span className={`todo-date ${overdue ? 'overdue' : ''}`}>
              <Calendar size={13} />
              {formatDate(todo.dueDate)}
              {overdue && <span className="overdue-label"> Overdue</span>}
            </span>
            {todo.projectName && (
              <span className="todo-project">
                <Folder size={13} />
                {todo.projectName}
              </span>
            )}
            <span className={`todo-status status-${todo.status}`}>
              {todo.status.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {isExpanded && todo.description && (
        <motion.div
          className="todo-expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="todo-description">{todo.description}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TodoItem