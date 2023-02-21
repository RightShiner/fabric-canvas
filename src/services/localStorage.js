export const storageTokenKey = 'auth-token'

export class LocalStorage {
  static setItem(value) {
    localStorage.setItem(storageTokenKey, JSON.stringify(value))
  }

  static getItem() {
    const items = localStorage.getItem(storageTokenKey)
    if (!items) return null
    return JSON.parse(items)
  }

  static removeItem() {
    localStorage.removeItem(storageTokenKey)
  }

  static clear() {
    localStorage.clear()
  }
}
