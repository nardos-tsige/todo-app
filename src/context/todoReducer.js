export function todoReducer(state, action) {
  console.log('Reducer action:', action.type, action.payload)
  
  switch (action.type) {
    case 'ADD_PROJECT': {
      const newProject = {
        id: Date.now().toString(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
        todos: [],
      }
      return {
        ...state,
        projects: [...state.projects, newProject],
        activeProjectId: newProject.id,
      }
    }

    case 'DELETE_PROJECT': {
      const remaining = state.projects.filter(
        (p) => p.id !== action.payload.id
      )
      return {
        ...state,
        projects: remaining,
        activeProjectId: remaining[0]?.id ?? null,
      }
    }

    case 'SET_ACTIVE_PROJECT': {
      return {
        ...state,
        activeProjectId: action.payload.id,
      }
    }

    case 'ADD_TODO': {
      const newTodo = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        dueDate: action.payload.dueDate,
        priority: action.payload.priority || 'medium',
        status: 'todo',
        createdAt: new Date().toISOString(),
      }
      
      const updatedProjects = state.projects.map((p) =>
        p.id === action.payload.projectId
          ? {
              ...p,
              todos: [...p.todos, newTodo],
            }
          : p
      )
      
      console.log('Added todo:', newTodo)
      console.log('Updated projects:', updatedProjects)
      
      return {
        ...state,
        projects: updatedProjects,
      }
    }

    case 'UPDATE_TODO': {
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId
            ? {
                ...p,
                todos: p.todos.map((t) =>
                  t.id === action.payload.id
                    ? { ...t, ...action.payload.updates }
                    : t
                ),
              }
            : p
        ),
      }
    }

    case 'DELETE_TODO': {
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId
            ? {
                ...p,
                todos: p.todos.filter((t) => t.id !== action.payload.id),
              }
            : p
        ),
      }
    }

    case 'TOGGLE_STATUS': {
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId
            ? {
                ...p,
                todos: p.todos.map((t) =>
                  t.id === action.payload.id
                    ? {
                        ...t,
                        status: t.status === 'done' ? 'todo' : 'done',
                      }
                    : t
                ),
              }
            : p
        ),
      }
    }

    case 'LOAD_FROM_STORAGE': {
      return action.payload
    }

    default:
      return state
  }
}