<template>
  <div v-if="notification.show" class="text-center" >
    <v-snackbar :color=notification.type v-model="notification.show">
     {{ notification.message }}
     <template v-slot:actions>
     <v-btn icon="mdi-close-thick" size="large" @click=removeNotification>
     </v-btn>
     </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/CartStore.js";
import { storeToRefs } from "pinia";

const cartStore =  useCartStore()
const { cart, notification } = storeToRefs(cartStore)

const removeNotification = () => {
  notification.show =  false
}

</script>

<style lang="scss" scoped>

</style>
