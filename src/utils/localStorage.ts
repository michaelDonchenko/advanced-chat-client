export const getLocalStorage = (key: string) => {
  const itemFromLocalStorage = localStorage.getItem(key) ?? null
  if (itemFromLocalStorage === null) {
    return null
  }
  return JSON.parse(itemFromLocalStorage)
}

export const setLocalStorage = (key: string, value: any) => {
  if (typeof value === 'undefined') {
    return localStorage.setItem(key, JSON.stringify(''))
  }

  localStorage.setItem(key, JSON.stringify(value))
}
