import { Modal } from '@/components/Modal'

interface ConfirmModalProps {
  onConfirm: () => void
  title?: string
  description?: string
  confirmButtonLabel?: string
  cancleButtonLabel?: string
}
export default function ConfirmModal({
  onConfirm,
  title,
  description,
  confirmButtonLabel = 'OK',
  cancleButtonLabel = 'Cancel',
}: ConfirmModalProps) {
  return (
    <Modal modalId="confirm">
      {title && <h3 className="font-bold text-lg">{title}</h3>}
      {description && <p className="py-4">{description}</p>}
      <div className="modal-action">
        <label htmlFor="confirm" className="btn">
          {cancleButtonLabel}
        </label>
        <label htmlFor="confirm" className="btn btn-error" onClick={onConfirm}>
          {confirmButtonLabel}
        </label>
      </div>
    </Modal>
  )
}
