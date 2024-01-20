<template>
  <v-app-bar >
    <v-app-bar-title class="d-inline font-weight-bold text-blue-darken-3"
      ><v-icon icon="mdi-circle-slice-6" size="x-large"></v-icon>
    </v-app-bar-title>
    <v-icon class="d-flex d-sm-none d-md-none" icon="mdi-magnify" size="large"></v-icon>
    <v-spacer></v-spacer>
    <v-responsive class="mt-5 d-none d-sm-flex d-md-flex "  max-width="600">
      <v-text-field
        label="search"
        density="compact"
        type="input"
        variant="outlined"
        placeholder="search"
        color="blue"
        append-inner-icon="mdi-magnify"
        rounded
      ></v-text-field>
    </v-responsive>
    <v-spacer></v-spacer>
      <v-btn>Login</v-btn>
    <v-btn router to="/index/cart">Cart<v-badge :content="count" color="success"><v-icon icon="mdi-cart-outline" size="x-large"></v-icon></v-badge></v-btn>
  </v-app-bar>
</template>

<script setup>
  import { useCartStore} from "@/store/CartStore";
  import { storeToRefs } from "pinia";
  import { ref,computed } from "vue";

  const cartStore = useCartStore()

  const count = computed(() =>cartStore.cart.count)
</script>
