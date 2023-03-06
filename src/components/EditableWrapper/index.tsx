import React, { useState, useRef, PropsWithChildren, MouseEvent, RefObject } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import cn from 'classnames'
import { TbCalendarEvent, TbTrash } from 'react-icons/tb'
import { ModalTrigger } from '@/components/Modal'

type Props = {
  onChangeEditMode: (isEditMode: boolean) => void
  triggerTimeMs?: number
  boundary?: RefObject<HTMLElement>
}

export default function EditableWrapper({
  onChangeEditMode,
  triggerTimeMs = 750,
  children,
  boundary,
}: PropsWithChildren<Props>) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [scale, setScale] = useState(1.0)
  const timerRef = useRef<number | null>(null)
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    onChangeEditMode(false)
    setIsEditMode(false)
  }, boundary)

  const handleEditMode = () => {
    setIsEditMode(true)
    onChangeEditMode(true)
    setScale(1.0)
  }

  const handlePointerDown = () => {
    timerRef.current = window.setTimeout(handleEditMode, triggerTimeMs)
    setScale(0.9)
  }

  const handleRelease = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setScale(1.0)
  }

  const handleOnDelete = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onChangeEditMode(true)
  }

  const handleOnMove = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onChangeEditMode(true)
  }

  const deleteButton = (
    <ModalTrigger modalId="confirm">
      <div
        className={cn(
          'p-2 bg-base-200 text-2xl text-base-content rounded-full border-2 border-base-300 ',
          'active:scale-75 transform transition-transform duration-200 ease-in-out',
        )}
        onClick={handleOnDelete}
        onTouchStart={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <TbTrash />
      </div>
    </ModalTrigger>
  )

  const moveButton = (
    <ModalTrigger modalId="calendar">
      <div
        className={cn(
          'p-2 bg-base-200 text-2xl text-base-content rounded-full border-2 border-base-300 active:scale-90',
          'active:scale-75 transform transition-transform duration-200 ease-in-out',
        )}
        onClick={handleOnMove}
        onTouchStart={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <TbCalendarEvent />
      </div>
    </ModalTrigger>
  )

  return (
    <div
      onMouseDown={handlePointerDown}
      onMouseUp={handleRelease}
      onTouchStart={handlePointerDown}
      onTouchEnd={handleRelease}
      className={cn(
        'flex flex-row relative',
        'transform transition-transform duration-200 ease-in-out',
        'touch-none',
      )}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {children}
      <div
        ref={containerRef}
        className="absolute p-2 flex flex-row gap-2 top-1 right-1 transform transition-all duration-150 ease-in-out bg-base-100 bg-opacity-90"
        style={{ transform: `scale(${isEditMode ? 1 : 0})` }}
      >
        {moveButton}
        {deleteButton}
      </div>
    </div>
  )
}
