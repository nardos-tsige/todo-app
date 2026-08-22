import { useTodo } from '../../hooks/useTodo'
import { PRIORITY_LABELS } from '../../utils/constants'
import './Statistics.css'

function Statistics() {
  const { allTodos } = useTodo()

  const total = allTodos.length
  const completed = allTodos.filter((t) => t.status === 'done').length
  const inProgress = allTodos.filter((t) => t.status === 'in-progress').length
  const todo = allTodos.filter((t) => t.status === 'todo').length
  const overdue = allTodos.filter(
    (t) => t.status !== 'done' && new Date(t.dueDate) < new Date()
  ).length

  const priorityCounts = allTodos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1
    return acc
  }, {})

  return (
    <div className="statistics">
      <h3>Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{todo}</span>
          <span className="stat-label">To Do</span>
        </div>
        <div className="stat-card overdue-stat">
          <span className="stat-value">{overdue}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      <div className="priority-stats">
        <h4>By Priority</h4>
        <div className="priority-bars">
          {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
            <div key={key} className="priority-bar">
              <span className="priority-label">{label}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${total ? (priorityCounts[key] || 0) / total * 100 : 0}%`,
                    background: `var(--priority-${key})`,
                  }}
                />
              </div>
              <span className="priority-count">{priorityCounts[key] || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Statistics