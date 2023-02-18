import API from './base'

export const getUserStatistics = async () => {
  const { data } = await API.get(`auth/user-info`)
  return data
}
