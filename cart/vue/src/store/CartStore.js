import { defineStore } from 'pinia'
import axiosClient from '../axios'


export const useCartStore = defineStore('cartStore', {

  state: () => ({
    cart: {
      data: [],
      count: 0,
      quantity: [],
      priceCount: [],
      totalPrice: null
    },
    notification: {
      show: false,
      type: null,
      message: null
    }
  }),
  getters: {
    cartCount: (state) => {
      state.cart.count = state.cart.quantity.reduce((a, c) => a + c, 0)
      return state.cart.count
    },
    cartQuantity: (state) => {
      state.cart.quantity = state.cart.data.map(q => q.quantity)
      return state.quantity
    },
    priceCount: (state) => {
      state.cart.priceCount = state.cart.data.map(q => q.price * q.quantity)
      return state.priceCount
    },
    priceTotal: (state) => {
      state.cart.totalPrice = state.cart.priceCount.reduce((a, c) => a + c, 0)
      return state.cart.totalPrice
    }
  },
  actions: {
    addToCart(product) {
      const cartProduct = product
      const findItem = this.cart.data.find(obj => obj.id === cartProduct.id && obj.size === cartProduct.size && obj.color === cartProduct.color)
      if (findItem) {
        findItem.quantity += cartProduct.quantity
        this.notification.show = true
        this.notification.type = 'success'
        this.notification.message = 'cart has been updated successfully'
        setTimeout(() => {
          this.notification.show = false;
        }, 2000)
      } else {
        this.cart.data.push(product)
        this.notification.show = true
        this.notification.type = 'success'
        this.notification.message = 'product has been added successfully'
        sessionStorage.setItem('cart', JSON.stringify(this.cart.data))
        setTimeout(() => {
          this.notification.show = false;
        }, 2000)
      }
    },
    async getProductBySlug(slug) {
      const res = await axiosClient.get(`/product-by-slug/${slug}`)
      const data = await res.data
      this.cart.productInfo.push(data.data)
      return data
    },
    removeItem(item) {
      const itemToRemove = item
      const cartItemToRemove = this.cart.data.findIndex(obj => obj.id === itemToRemove)
      this.notification.show = true,
      this.notification.type = 'error'
      this.notification.message = 'product has removed successfully'
      this.cart.data.splice(cartItemToRemove, 1)
      setTimeout(() => {
        this.notification.show = false;
      }, 5000)

    }
  }
})
