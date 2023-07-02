import axios from 'axios';
import  { useAuthStore }  from './store/AuthStore';


const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

axiosClient.interceptors.request.use(config => {
const authStore = useAuthStore()
  config.headers.Authorization = `Bearer ${authStore.$state.user.token}`
  return config
})


export default axiosClient
