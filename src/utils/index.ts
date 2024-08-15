// 获取localStorage
export const getLocalInfo = (key: string) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (e) {
    return value
  }
}
// 存储localStorage
export const setLocalInfo = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 清除指定localStorage
export const deleteLocalInfo = (key: string) => {
  window.localStorage.removeItem(key)
}
// 清除全部localStorage
export const deleteAllLocalInfo = () => {
  window.localStorage.clear()
}
// 获取需要展开的 subMenu
export const getOpenKeys = (path: string) => {
  let newStr: string = ''
  const newArr: any[] = []
  const arr = path.split('/').map((i) => `/${i}`)
  for (let i = 1; i < arr.length; i++) {
    newStr += arr[i]
    newArr.push(newArr)
  }
  return newArr
}
