<template>
  <v-app >
    <default-bar />
    <SideBar/>
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import SideBar from "@/layouts/admin/Navigation.vue";
</script>
<style>
 
</style>
