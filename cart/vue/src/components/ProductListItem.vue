<template>
  <div>
    <v-card max-width="375" class="hover">
      <v-img cover height="250" :src="product.image_url"  @click="getProduct">
      </v-img>
      <v-card-item>
        <v-card-title class="">{{product.name}}</v-card-title>
        <v-card-subtitle>{{product.category}}</v-card-subtitle>
        <v-card-subtitle  class="font-weight-bold text-red-darken-3">{{product.quantity}} units</v-card-subtitle>
        <div class="my-4 text-subtitle-1">N{{product.price}}</div>
        <v-card-actions>
          <v-btn prepend-icon="mdi-plus" @click="sss" class="bg-green P-2" block>ADD TO CART</v-btn>
        </v-card-actions>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const { product } = defineProps({
  product:Object
})

function getProduct(){
 router.push({name:'ProductView',  params: { slug:product.slug }})
}
function sss(){
  console.log("God is good")
}
</script>

<style>
.hover:hover {
  scale:105%;
  box-shadow: 3px 3px 3px 3px gray;
}


</style>
