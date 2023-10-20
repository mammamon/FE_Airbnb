
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
