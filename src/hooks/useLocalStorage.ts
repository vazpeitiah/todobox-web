export const useLocalStorage = (key: string) => {
  const get = () => {
    const item = localStorage.getItem(key)
    return item
  }
  const set = (value: string) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const remove = () => {
    localStorage.removeItem(key)
  }
  return { get, set, remove }
}
