<template>
  <div>

    <v-navigation-drawer theme="dark" class="d-flex d-md-flex" v-model=drawer>
      <div class="mb-2 d-flex mt-5 justify-center align-center text-h6">
        <v-icon icon="mdi-circle-slice-6" size="large" color="blue-darken-2"/>
         AdminHub
      </div>
      <v-divider></v-divider>
     <v-list density="compact"  v-for="item in navigation" :key="item" nav>
      <v-list-item :prepend-icon="item.icon" :title="item.name" :value="item.name" router :to="item.to" :active-color="[this.$route.name === item.name ? 'blue' : '']"/>

     </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUtilityStore } from "../../store/UtilityStore";

const utilityStore = useUtilityStore()

const { drawer } = storeToRefs(utilityStore)

  const navigation = [
    {name:'Dashboard', icon:'mdi-view-dashboard', to:'/dashboard'},
    {name:'Users', icon:'mdi-account', to:'/users'},
    {name:'Categories', icon:'mdi-cog', to:'categories'},
    {name:'Products', icon:'mdi-cart', to:'/products'},
    {name:'Message', icon:'mdi-message-alert', to:''},
  ]
</script>
