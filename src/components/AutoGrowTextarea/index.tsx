import cn from 'classnames'
import { useRef, ChangeEvent, useEffect } from 'react'

interface AutoGrowTextareaProps {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  spellCheck?: boolean
  placeholder?: string
  minHeight?: string
}

export default function AutoGrowTextarea({
  value,
  onChange,
  className,
  placeholder = '빛나는 정유미',
  spellCheck = false,
  minHeight = '256px',
}: AutoGrowTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      textarea.style.height = 'auto'
      const height = textarea.scrollHeight + textarea.offsetHeight - textarea.clientHeight
      textarea.style.height = `${height}px`
    }
  }, [value])

  return (
    <textarea
      className={cn(`h-auto min-h-[${minHeight}]`, className)}
      spellCheck={spellCheck}
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
