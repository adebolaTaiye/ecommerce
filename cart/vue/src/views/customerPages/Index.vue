<template>
<customer-page-component>
   <div class="d-flex flex-column justify-center h-screen align-center" v-if="products.loading">
      <v-progress-circular :size="50" color="primary" :width="6" indeterminate>
      </v-progress-circular>
    </div>
    <v-lazy v-else>
      <v-container >
    <v-row>
      <v-col v-for="(product, index) in products.data" :key="index" lg="3" md="4" sm="4" xs="6" cols="12">
         <product-list-item
            :product="product"
          />
      </v-col>
    </v-row>
       <div class="text-center mt-10">
          <v-pagination
            v-model="page"
            :length="products.links.last_page"
            @click="productStore.getProductsPage(page)"
            color="green-darkened-4"
            elevation="3"
            active-color="blue"
            variant="outlined"
            border="3"
          >
          </v-pagination>
        </div>
  </v-container>
    </v-lazy>

</customer-page-component>
</template>

<script setup>
import CustomerPageComponent from "../../components/CustomerPageComponent.vue";
import ProductListItem from "../../components/ProductListItem.vue"
import { useProductStore } from "@/store/ProductStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const productStore = useProductStore();

const { products} = storeToRefs(productStore);

const page = ref(1);

productStore.getProductsPage(page)
</script>

<style lang="scss" scoped>

</style>
