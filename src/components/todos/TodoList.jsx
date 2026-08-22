import TodoItem from './TodoItem'
import './TodoList.css'

function TodoList({ todos, onEdit, projectId }) {
  if (!todos || todos.length === 0) return null
  
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          projectId={projectId}
        />
      ))}
    </div>
  )
}

export default TodoList