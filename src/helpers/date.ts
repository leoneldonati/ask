function parseDate (date: Date | string) {
  const isToday = new Date().getDay() === new Date(date).getDay()
  const hours = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()
  if (isToday) return `Today, ${hours}:${minutes} hs.`

  return new Date(date).toLocaleDateString('es')
}

export { parseDate }