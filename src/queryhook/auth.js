import { AUTH_API } from './base'

export const loginRequest = async (formData) => {
  const { data } = await AUTH_API.post(`token`, {
    ...formData
  })
  return data
}

export const registerRequest = async (formData) => {
  const { data } = await AUTH_API.post(`signup`, {
    ...formData
  })
  return data
}

export const resetPassword = async (email) => {
  const { data } = await AUTH_API.post(`reset_password`, {
    email: email.email
  })
  return data
}
