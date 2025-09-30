'use client'

export const browserLocalStorage = {
  set: ({ key, value }: { key: string; value: string }) => {
    window.localStorage.setItem(key, value)
  },
  get: (key: string) => {
    if (globalThis.window) {
      return window.localStorage.getItem(key)
    }
    return null
  },
  delete: (key: string) => {
    window.localStorage.removeItem(key)
  },
}
