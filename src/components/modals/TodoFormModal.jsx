import { useState, useEffect } from 'react'
import { useTodo } from '../../hooks/useTodo'
import Modal from './Modal'
import { Calendar, Tag, AlignLeft, Plus, Pencil } from 'lucide-react'
import './TodoFormModal.css'

function TodoFormModal({ isOpen, onClose, editingTodo, projectId }) {
  const { dispatch } = useTodo()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  })

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description || '',
        dueDate: editingTodo.dueDate,
        priority: editingTodo.priority,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
      })
    }
  }, [editingTodo, isOpen])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }

    if (!formData.dueDate) {
      alert('Please select a due date')
      return
    }

    if (editingTodo) {
      dispatch({
        type: 'UPDATE_TODO',
        payload: {
          id: editingTodo.id,
          projectId: editingTodo.projectId || projectId,
          updates: formData,
        },
      })
    } else {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          ...formData,
          projectId: projectId,
        },
      })
    }

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="todo-form-modal">
        <div className="modal-header">
          <div className="modal-icon">
            {editingTodo ? <Pencil size={20} /> : <Plus size={20} />}
          </div>
          <h2>{editingTodo ? 'Edit Task' : 'New Task'}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="textarea-wrapper">
              <AlignLeft size={16} className="input-icon" />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add details about this task..."
                rows="3"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <div className="input-wrapper">
                <Calendar size={16} className="input-icon" />
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <div className="input-wrapper">
                <Tag size={16} className="input-icon" />
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editingTodo ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default TodoFormModal