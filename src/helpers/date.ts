function parseDate (date: Date | string) {
  const isToday = new Date().getDay() === new Date(date).getDay()
  const hours = new Date(date).getHours()
  if (isToday) return `Today, ${hours} hs.`

  return new Date(date).toLocaleDateString('es')
}

export { parseDate }