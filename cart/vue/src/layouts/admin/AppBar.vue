<template>
  <v-app-bar flat>
    <v-app-bar-title >
      <v-icon icon="mdi-circle-slice-6" />
      AdminHub
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <p class="px-4"> {{ name }}</p>
    <v-btn @click="logout"> Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
 import router from '@/router';
import { useAuthStore } from '@/store/AuthStore';

const authStore = useAuthStore()

const name = authStore.$state.user.data.name

const logout = async () => {
  try{
    await authStore.adminLogout()
    router.push({
    path: '/adminlogin'
  })
  }catch(err) {
      console.log(err)
  }
}
</script>
