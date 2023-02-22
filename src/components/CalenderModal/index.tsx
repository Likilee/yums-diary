import { Modal } from '@/components/Modal'
import { Calendar, OnChangeDateCallback } from 'react-calendar'

interface CalendalModalProps {
  onChange: OnChangeDateCallback
  value: Date
}

export default function CalendalModal({ value, onChange }: CalendalModalProps) {
  return (
    <Modal modalId="calendar">
      <Calendar onChange={onChange} value={value} />
    </Modal>
  )
}
