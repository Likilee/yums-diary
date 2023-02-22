import { useRef, ChangeEvent, useEffect } from 'react'

interface AutoGrowTextarea {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  spellCheck?: boolean
}

export default function AutoGrowTextarea({
  value,
  onChange,
  className,
  spellCheck = false,
}: AutoGrowTextarea) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current
      element.style.height = 'inherit'
      const computedStyle = window.getComputedStyle(element)
      const height =
        parseInt(computedStyle.getPropertyValue('border-top-width'), 10) +
        parseInt(computedStyle.getPropertyValue('padding-top'), 10) +
        element.scrollHeight +
        parseInt(computedStyle.getPropertyValue('padding-bottom'), 10) +
        parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10)
      element.style.height = `${height}px`
    }
  }, [value])

  return (
    <textarea
      className={className}
      spellCheck={spellCheck}
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{ height: 'auto', minHeight: '256px' }}
    />
  )
}
