import { defineStore} from 'pinia'
import axiosClient from '@/axios'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    category: {},
    categories: {
      loading: false,
      data: []
    }
  }),
  getters: {
  
  },
  actions: {
    async saveCategory(category){
      if(category.id){
        const res = await axiosClient.put(`/categories/${category.id}`,category)
        const data = await res.data
        return data
      }else{
      const res = await axiosClient.post('/addcategory', category)
      const data = await res.data
      return data
      }

    },
    async getCategories(){
      this.categories.loading = true
      const res = await axiosClient.get('/categories')
      const data =  res.data
      this.categories.loading = false
      this.categories.data = data.data
      return data
    },
    async getCategory(id){
      const res = await axiosClient.get(`/categories/${id}`)
      const data = await res.data
      this.category = data.data
      return data
    },
    async deleteCategory(id){
      return await axiosClient.delete(`/categories/${id}`)
    }
  }
})
