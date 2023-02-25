import { useRef, ChangeEvent, useEffect, FormEventHandler, FormEvent } from 'react'

interface AutoGrowTextareaProps {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  spellCheck?: boolean
  placeholder?: string
}

export default function AutoGrowTextarea({
  value,
  onChange,
  className,
  placeholder = '빛나는 정유미',
  spellCheck = false,
}: AutoGrowTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current
      element.style.height = 'auto'
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
      placeholder={placeholder}
    />
  )
}

// export function AutoGrowTextarea2({
//   value,
//   onInput,
//   className,
//   placeholder = '빛나는 정유미',
//   spellCheck = false,
// }: AutoGrowTextareaProps) {
//   return (
//     <p
//       className={className}
//       placeholder={placeholder}
//       spellCheck={spellCheck}
//       onInput={onInput}
//       contentEditable
//     >
//       {value}
//     </p>
//   )
// }
