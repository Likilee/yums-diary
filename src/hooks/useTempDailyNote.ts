import { useLocalStorage } from '@/hooks/useLocalStorage'

export const useTempDailyNote = () => {
  const [tempDaily, setTempDaily] = useLocalStorage('tempDaily', '')

  return { tempDaily, setTempDaily }
}
