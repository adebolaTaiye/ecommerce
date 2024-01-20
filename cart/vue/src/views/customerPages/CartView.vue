<template>
  <customer-page-component>
    <v-component>
    <div class="d-flex d-flex justify-space-between">
      <div class=" text-lg-h4 text-md-h4 py-4 px-3 text-sm-h4 text-h5 font-weight-bold">Shopping Cart</div>
      <div class="text-lg-h4 text-md-h4 py-4 px-3 text-sm-h4 text-h5 font-weight-bold "><v-icon class="mb-1 mx-0" icon="mdi-currency-ngn" size="small"></v-icon>{{ priceTotal }}</div>
      </div>
    <v-table>
      <thead class="mb-4 px-3 bg-grey-lighten-2">
      <th class="text-center">Item Details</th>
      <th class="text-left">Quantity</th>
      <th class="text-left">Item Price</th>
      <th class="text-left">Action</th>
      </thead>
      <tbody>
      <tr v-for="(item,index) in cart.data" :key="index">
      <td>
      <v-row>
      <v-col>
        <v-img height="100" :src="item.image"></v-img>
      </v-col>
      <v-col class="mt-7">
      <div class="font-weight-bold text-h6">{{ item.name }}</div>
      <div class="text-subtitle-2 text-grey-darken-2">Color: <span class="font-weight-bold ">{{ item.color }} </span>    Size: <span class="font-weight-bold">{{ item.size  }}</span></div>
      </v-col>
      </v-row>
      </td>
      <td><v-responsive max-width="80px"><v-text-field variant="outlined" type="number" color="primary" density="compact"  v-model.number="item.quantity"></v-text-field></v-responsive></td>
      <td><span class="font-weight-bold text-h6"><v-icon class="mb-2"  icon="mdi-currency-ngn" size="small"></v-icon>{{ item.price * item.quantity }}</span><br><p class=" text-subtitle-2 text-grey-darken-2"><v-icon icon="mdi-currency-ngn" size="small"></v-icon>{{ item.price }} x {{ item.quantity }} items</p></td>
      <td><v-btn prepend-icon="mdi-delete" class="text-primary" variant="text" @click="cartStore.removeItem(item.id)">Remove Item</v-btn></td>
      </tr>
      </tbody>
    </v-table>
    </v-component>
    <Notification/>
  </customer-page-component>
</template>

<script setup>
  import CustomerPageComponent from "../../components/CustomerPageComponent.vue";
  import Notification from "../../components/Notification.vue"
  import { useCartStore} from "@/store/CartStore";
  import { storeToRefs } from "pinia";
  import { useProductStore} from "@/store/ProductStore"
  import { ref,computed } from "vue";

  const cartStore = useCartStore()
  const { cart } = storeToRefs(cartStore)
  const count = computed(() => cartStore.cart.count)
  let priceTotal = computed(() => cartStore.cart.totalPrice)

</script>

<style lang="scss" scoped>

</style>
