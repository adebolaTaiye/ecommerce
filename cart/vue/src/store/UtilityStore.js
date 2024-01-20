import { defineStore } from 'pinia'

export const useUtilityStore = defineStore('utilityStore',{
  state: () => ({
    drawer : true,
    dialogState: false
  }),
  getters: {

  },
  actions: {
      navState(){
        this.drawer = !this.drawer
      },
      userProfile(){
        this.dialogState = !this.dialogState
      }
  }
})
