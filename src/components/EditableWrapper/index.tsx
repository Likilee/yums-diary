import React, { useState, useRef, PropsWithChildren, MouseEvent } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import cn from 'classnames'
import { TbCalendarEvent, TbTrash } from 'react-icons/tb'

type Props = {
  triggerTimeMs?: number
  onDelete: () => void
  onMove: () => void
}

function EditableWrapper({
  triggerTimeMs = 750,
  onDelete,
  onMove,
  children,
}: PropsWithChildren<Props>) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [scale, setScale] = useState(1.0)
  const timerRef = useRef<number | null>(null)
  const containerRef = useOutsideClick<HTMLDivElement>(() => setIsEditMode(false))

  const handleEditMode = () => {
    setIsEditMode(true)
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

  const handleOnDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDelete()
  }

  const handleOnMove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onMove()
  }

  const deleteButton = (
    <button
      className=" p-2 bg-base-200 text-2xl text-base-content rounded-full border-2 border-base-300"
      onClick={handleOnDelete}
      onTouchStart={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <TbTrash />
    </button>
  )
  const moveButton = (
    <button
      className=" p-2 bg-base-200 text-2xl text-base-content rounded-full border-2 border-base-300"
      onClick={handleOnMove}
      onTouchStart={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <TbCalendarEvent />
    </button>
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

export default EditableWrapper
