import Modal from '../modals/Modal'
import './ConfirmDialog.css'

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="confirm-dialog">
        <div className="confirm-icon">⚠️</div>
        <h3>{title || 'Are you sure?'}</h3>
        <p>{message || 'This action cannot be undone.'}</p>
        <div className="confirm-actions">
          <button className="confirm-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-delete" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog