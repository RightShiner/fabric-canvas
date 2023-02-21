import { LocalStorage } from "services/localStorage";


export const parseJwt = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

export const CheckUserValid = () => {
  const token = LocalStorage.getItem()
  if (!token) return
  const { exp } = parseJwt(token)
  const remainingTime = Date.now() - exp * 1000
  if (remainingTime > 0) {
    LocalStorage.removeItem()
    toast.error('Your login has expired')
  } else {
    return exp
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
