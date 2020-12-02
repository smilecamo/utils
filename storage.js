/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
  /**
   *
   * 存储
   * @param {*} key 参数名称
   * @param {*} value 值
   * @param {number} [expire=1000 * 60 * 60 * 24 * 90] 过期时间默认90天
   */
  set(key, value, expire = 1000 * 60 * 60 * 24 * 90) {
    const expires = new Date().getTime() + expire
    const data = { value, expires }
    localStorage.setItem(key, JSON.stringify(data))
  },
  get(key) {
    const storageResult = localStorage.getItem(key)
    const time = new Date().getTime()
    let result = {}
    if (storageResult) {
      const obj = JSON.parse(storageResult)
      if (time < obj.expires) {
        result = obj.value
      } else {
        result = null
        localStorage.removeItem(key)
      }
      return result
    } else {
      return null
    }
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key)
  }
}

/**
 * 封装操作sessionStorage本地存储的方法
 */
export const sessionStorage = {
  // 存储
  set(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  get(key) {
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  // 删除数据
  remove(key) {
    window.sessionStorage.removeItem(key)
  }
}
