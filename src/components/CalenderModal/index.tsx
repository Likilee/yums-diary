import { Modal } from '@/components/Modal'
import { useState } from 'react'
import { Calendar, OnChangeDateCallback } from 'react-calendar'
import { CalendarContainer, CalendarContainerProps } from 'react-datepicker'

interface CalendalModalProps {
  onChange: OnChangeDateCallback;
  value: Date
}
export default function CalendalModal({value, onChange}: CalendalModalProps) {

  return (
    <Modal modalId="calendar">
      <Calendar onChange={onChange} value={value}/>
    </Modal>
  )
}
