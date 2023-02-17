import API from './base'

export const getUserStatistics = async () => {
  const { data } = await API.get(`userinfo`)
  return data
}
