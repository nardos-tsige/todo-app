import { useMemo } from 'react'

export function useFilteredTodos(todos, filters, sortBy) {
  return useMemo(() => {
    if (!todos || todos.length === 0) return []
    
    let filtered = [...todos]

    if (filters.status) {
      filtered = filtered.filter((t) => t.status === filters.status)
    }

    if (filters.priority) {
      filtered = filtered.filter((t) => t.priority === filters.priority)
    }

    if (filters.search) {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(query)
      )
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'dueDate':
            return new Date(a.dueDate) - new Date(b.dueDate)
          case 'priority': {
            const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
          }
          case 'createdAt':
            return new Date(b.createdAt) - new Date(a.createdAt)
          default:
            return 0
        }
      })
    }

    return filtered
  }, [todos, filters, sortBy])
}