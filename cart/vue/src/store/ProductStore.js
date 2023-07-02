import { defineStore } from 'pinia'
import  axiosClient  from '../axios'

export const useProductStore = defineStore('productStore',{
  state: () => ({
    currentProduct: {},
    products: {
      loading: false,
      data: [],
      links:[]
    }
  }),
  getters: {
      linkLength:(state) => {
        return state.products.links.length
      }
  },
  actions: {
    async saveProduct(product){
      if(product.id){
        const res =await axiosClient.put(`product/${product.id}`,product)
        const data = await res.data
        return data
      }else{
      const res = await axiosClient.post('/product',product)
      const data = await res.data
      return data
      }
    },
   async getProducts(){
    this.products.loading=true
    const res = await axiosClient.get('/product')
    const data = await res.data
    this.products.loading=false
    this.products.data = data.data
    this.products.links = data.meta
    return data
   },
   async getPage(num){
      const res = await axiosClient.get(`/product/?page=${num}`)
      const data = await res.data
      this.products.data = data.data
   },
   async getProduct(id){
    const res = await axiosClient.get(`/product/${id}`)
    const data = await res.data
    this.currentProduct = data.data
    return data
   },
   async deleteProduct(id){
    return await axiosClient.delete(`/product/${id}`)
  },
  async searchProduct(name){
    const res = await axiosClient.get(`/search?query=${name}`)
    const data = await res.data
    this.products.data = data.data
    this.products.links = data.meta
    return data
  }
  }
})
