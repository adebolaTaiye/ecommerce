<template>
  <div
    class="d-flex flex-column justify-center h-screen align-center"
    v-if="currentProduct.loading"
  >
    <v-progress-circular :size="50" color="primary" :width="6" indeterminate>
    </v-progress-circular>
  </div>
  <customer-page-component v-else>
    <v-component>
      <v-card>
        <v-row>
          <v-col lg="7" md="7" sm="12" cols="12">
            <v-img height="450" :src="currentProduct.data.image_url"></v-img>
          </v-col>
          <v-col lg="5" md="5" sm="12" cols="12">
            <div class="px-3">
              <p class="text-h3 font-weight-bold pt-4">{{ currentProduct.data.name }}</p>
              <h6 class="text-h6 font-weight-bold"><v-icon icon="mdi-currency-ngn" size="small"></v-icon>{{ currentProduct.data.price }}</h6>
              <h6 class="pt-1 text-h6">{{ currentProduct.data.description }}</h6>
              <div v-if="currentProduct.data.colors != ''">
                <h6 class="text-h6 font-weight-bold">Colors</h6>
                <v-radio-group v-model="item.color" inline>
                  <div v-for="(color, index) in currentProduct.data.colors" :key="index">
                    <v-radio :label="color.text" :value="color.text"></v-radio>
                  </div>
                </v-radio-group>
              </div>
              <div v-if="currentProduct.sizes != ''">
                <h6 class="text-h6 font-weight-bold">Sizes</h6>
                <v-radio-group v-model="item.size" inline>
                  <div v-for="(size, index) in currentProduct.data.sizes" :key="index">
                    <v-radio
                      :label="size.text"
                      :color="size.text"
                      :value="size.text"
                    ></v-radio>
                  </div>
                </v-radio-group>
              </div>
              <div class="d-flex d-flex justify-space-between">
                <p class="font-weight-bold">Quantity</p>
                <v-responsive max-width="80px">
                  <v-text-field
                    variant="outlined"
                    type="number"
                    color="primary"
                    density="compact"
                    v-model.number="item.quantity"
                  ></v-text-field>
                </v-responsive>
              </div>
              <v-card-actions>
                <v-btn
                  prepend-icon="mdi-plus"
                  class="bg-green"
                  @click="addCartItem"
                  size="x-large"
                  block
                  >ADD TO CART</v-btn
                >
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-component>
    <Notification/>
  </customer-page-component>
</template>

<script setup>
import CustomerPageComponent from "../../components/CustomerPageComponent.vue";
import Notification from "../../components/Notification.vue"
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/ProductStore";
import { useCartStore } from "@/store/CartStore";
import { ref, computed } from "vue";

const productStore = useProductStore();
const cartStore = useCartStore();
const route = useRoute();
const { currentProduct } = storeToRefs(productStore);
const { cart } = storeToRefs(cartStore);



const id = computed(() => productStore.currentProduct.data.slug);
const image = computed(() => productStore.currentProduct.data.image_url);
const price = computed(() => productStore.currentProduct.data.price);
const name = computed(() => productStore.currentProduct.data.name);

productStore.getProductBySlug(route.params.slug);

const item = ref({
  color: "",
  size: "",
  quantity: 1,
  id: id,
  image: image,
  price: price,
  name: name,
});

function addCartItem() {
  cartStore.addToCart(item.value);
}
</script>

<style lang="scss" scoped></style>
