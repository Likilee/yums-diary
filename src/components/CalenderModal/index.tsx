import { Modal } from '@/components/Modal'
import { PropsWithChildren } from 'react'
import { Calendar, OnChangeDateCallback } from 'react-calendar'

interface CalendalModalProps {
  onChange: OnChangeDateCallback
  value: Date
}

export default function CalendalModal({
  value,
  onChange,
  children,
}: PropsWithChildren<CalendalModalProps>) {
  return (
    <Modal modalId="calendar">
      <Calendar onChange={onChange} value={value} />
      {children}
    </Modal>
  )
}
