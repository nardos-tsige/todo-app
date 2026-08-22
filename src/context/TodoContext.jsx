import { createContext, useContext, useReducer, useEffect } from 'react'
import { todoReducer } from './todoReducer'

export const TodoContext = createContext()

const INITIAL_STATE = {
  activeProjectId: 'default',
  projects: [
    {
      id: 'default',
      name: 'Personal',
      createdAt: new Date().toISOString(),
      todos: [],
    },
  ],
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(
    todoReducer,
    INITIAL_STATE,
    () => {
      const saved = localStorage.getItem('taskflow-state')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          console.log('Loaded from localStorage:', parsed)
          return parsed
        } catch (e) {
          console.error('Error loading from localStorage:', e)
          return INITIAL_STATE
        }
      }
      return INITIAL_STATE
    }
  )

  useEffect(() => {
    console.log('Saving to localStorage:', state)
    localStorage.setItem('taskflow-state', JSON.stringify(state))
  }, [state])

  const activeProject = state.projects.find(
    (p) => p.id === state.activeProjectId
  ) ?? null

  const allTodos = state.projects.flatMap((p) =>
    p.todos.map((t) => ({
      ...t,
      projectName: p.name,
      projectId: p.id,
    }))
  )

  const getProjectCount = (projectId) => {
    const project = state.projects.find((p) => p.id === projectId)
    return project ? project.todos.length : 0
  }

  const getTodoCounts = () => {
    const total = allTodos.length
    const completed = allTodos.filter((t) => t.status === 'done').length
    const overdue = allTodos.filter(
      (t) => t.status !== 'done' && new Date(t.dueDate) < new Date()
    ).length
    return { total, completed, overdue }
  }

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        activeProject,
        allTodos,
        getProjectCount,
        getTodoCounts,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo must be used inside a TodoProvider')
  }
  return context
}