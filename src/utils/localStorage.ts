export const getLocalStorage = (key: string) => {
  const itemFromLocalStorage = localStorage.getItem(key) ?? null
  if (itemFromLocalStorage === null) {
    return null
  }
  return JSON.parse(itemFromLocalStorage)
}

export const setLocalStorage = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value))
}
