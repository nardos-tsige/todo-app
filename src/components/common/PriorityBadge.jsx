import { PRIORITY_LABELS, PRIORITY_COLORS } from '../../utils/constants'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import './PriorityBadge.css'

function PriorityBadge({ priority }) {
  const color = PRIORITY_COLORS[priority] || '#6a6a82'
  const label = PRIORITY_LABELS[priority] || priority
  
  const getIcon = () => {
    switch(priority) {
      case 'urgent': return <AlertCircle size={12} />
      case 'high': return <AlertTriangle size={12} />
      case 'medium': return <Info size={12} />
      case 'low': return <CheckCircle size={12} />
      default: return null
    }
  }

  return (
    <span className={`priority-badge priority-${priority}`}>
      {getIcon()}
      {label}
    </span>
  )
}

export default PriorityBadge