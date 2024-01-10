const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const formatTime = (ms: number): string => {
  if (ms < 0) {
    return ''
  }

  const days = Math.floor(ms / DAY)
  const remainingHours = Math.floor((ms % DAY) / HOUR)
  const remainingMinutes = Math.floor((ms % HOUR) / MINUTE)
  const remainingSeconds = Math.floor((ms % MINUTE) / 1000)

  const HH = `${remainingHours}`.padStart(2, '0')
  const MM = `${remainingMinutes}`.padStart(2, '0')
  const SS = `${remainingSeconds}`.padStart(2, '0')

  return days > 0 ? `${days}일 ${HH}:${MM}:${SS}` : `${HH}:${MM}:${SS}`
}

export default formatTime
