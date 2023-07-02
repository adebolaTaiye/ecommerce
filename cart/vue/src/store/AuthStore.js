import { defineStore } from 'pinia'
import  axiosClient  from '../axios'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user : {
      data: JSON.parse(sessionStorage.getItem("DATA")),
      token: JSON.parse(sessionStorage.getItem("TOKEN"))
    }
  }),
  getters : {

  },
  actions : {
    async registerAdmin(user){
      const res = await axiosClient.post('/register',user)
      const data = await res.data
      return data

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
      this.user.data = {}
      this.user.token = null
      return res
    }
  }
})
