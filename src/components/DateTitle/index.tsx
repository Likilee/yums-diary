import format from 'date-fns/format'
import ko from 'date-fns/locale/ko'

interface DateTitleProps {
  date?: string | number | Date
  format?: string // date-fns format https://date-fns.org/v2.29.3/docs/format
}

export default function DateTitle(props: DateTitleProps) {
  const date = props.date ? new Date(props.date) : new Date()
  const formatStr = props.format ? props.format : 'MMM do (EEE)'
  return <span>{format(date, formatStr, { locale: ko })}</span>
}
