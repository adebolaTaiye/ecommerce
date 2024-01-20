import { defineStore } from 'pinia'
import  axiosClient  from '../axios'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user : {
      data: JSON.parse(sessionStorage.getItem("DATA")),
      token: JSON.parse(sessionStorage.getItem("TOKEN"))
    },
    userId : {},
    users : {
      loading: false,
      data: [],
    }

  }),
  getters : {

  },
  actions : {
    async saveAdmin(user){
      if(user.id){
        const res = await axiosClient.put(`/user/${user.id}`,user)
        const data = await res.data
        return data
      }else{
        const res = await axiosClient.post('/register',user)
        const data = await res.data
        return data
      }
    },
    async loginAdmin(user){
      const res = await axiosClient.post('/adminlogin',user)
      const data = await res.data
      this.user.token = data.token
      this.user.data = data.user
      sessionStorage.setItem("DATA",JSON.stringify(this.user.data))
      sessionStorage.setItem("TOKEN",JSON.stringify(this.user.token))
    },
    async adminLogout(){
      const res = await axiosClient.post("/adminlogout")
      this.user.data = null
      sessionStorage.DATA = null
      sessionStorage.TOKEN = null
      this.user.token = null
      return res
    },
    async getUsers(){
      this.users.loading = true
      const res = await axiosClient.get('/user')
      const data = await res.data
      this.users.loading = false
      this.users.data = data.data
      return data
    },
    async getUser(id){
      const res = await axiosClient.get(`user/${id}`)
      const data = await res.data
      this.userId = data.data
      return data
    },
    async deleteUser(id){
      return await axiosClient.delete(`/user/${id}`)
    }
  }
})
