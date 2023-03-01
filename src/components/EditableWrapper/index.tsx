import React, { useState, useRef, PropsWithChildren, MouseEvent } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import cn from 'classnames'

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

  const handleMouseDown = () => {
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

  const deleteButton = isEditMode && (
    <button
      className="px-2 py-1 bg-red-600 text-white rounded"
      onClick={handleOnDelete}
      onTouchStart={(e) => e.stopPropagation()}
    >
      Delete
    </button>
  )
  const moveButton = isEditMode && (
    <button
      className="px-2 py-1 bg-green-600 text-white rounded"
      onClick={handleOnMove}
      onTouchStart={(e) => e.stopPropagation()}
    >
      Move
    </button>
  )

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleRelease}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleRelease}
      className={cn(
        `scale-[${scale}]`,
        'flex flex-row relative',
        'transform transition-transform duration-200 ease-in-out',
        'touch-none',
      )}
    >
      {children}
      <div ref={containerRef} className="transform transition-all duration-500 ease-in-out">
        {moveButton}
        {deleteButton}
      </div>
    </div>
  )
}

export default EditableWrapper
