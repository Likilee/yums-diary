import CalendalModal from '@/components/CalenderModal'
import { ModalTrigger } from '@/components/Modal'
import { useState } from 'react'

export default function NewDailyNote() {
  const [value, onChange] = useState(new Date())

  return (
    <>
      <ModalTrigger modalId="calendar">{value.toLocaleDateString()}</ModalTrigger>
      <CalendalModal value={value} onChange={onChange} />
    </>
  )
}
