import axios from 'axios'

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVER_URL + '/auth',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default authAxios
