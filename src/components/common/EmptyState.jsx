import { Inbox, Plus } from 'lucide-react'
import './EmptyState.css'

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        <Inbox size={40} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button className="empty-action" onClick={onAction}>
          <Plus size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState