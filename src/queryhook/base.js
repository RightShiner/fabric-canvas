import { LocalStorage } from 'services/localStorage'
import axios from 'axios'

export const baseURL = process.env.API_URL
export const imageURL = process.env.UPLOAD_URL
export const contentURL = process.env.CONTENT_URL
export const authURL = process.env.AUTH_URL
export const { API_KEY } = process.env
export const { API_KEY_IMAGE } = process.env

const API = axios.create({
  baseURL
})

export const AUTH_API = axios.create({
  baseURL: authURL
})

export const IMAGE = axios.create({
  baseURL: imageURL
})

export const CONTENT_GEN_API = axios.create({ baseURL: contentURL })

CONTENT_GEN_API.interceptors.request.use(
  config => {
    const token = LocalStorage.getItem()
    config.headers['x-api-key'] = API_KEY
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.request.use(
  config => {
    const token = LocalStorage.getItem()
    if (config.headers) {
      config.headers['x-api-key'] = API_KEY
      config.headers.token = `${token}`
      config.headers.Accept = 'application/json'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

AUTH_API.interceptors.request.use(
  config => {
    if (config.headers) {
      config.headers['x-api-key'] = API_KEY
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


IMAGE.interceptors.request.use(
  config => {
    if (config.headers) {
      config.headers.api_key = API_KEY_IMAGE
      // config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default API
