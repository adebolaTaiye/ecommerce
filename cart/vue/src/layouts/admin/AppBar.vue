<template>
  <v-app-bar flat>
     <v-app-bar-nav-icon  @click="utilityStore.navState()" class="d-flex d-sm-flex d-md-flex d-lg-none"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6"  class="d-flex d-md-flex d-lg-none justify-sm-end" size="x-large" color="blue"/>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-menu
      transition="slide-x-transition"
      open-on-hover>
    <template v-slot:activator="{props}">
      <v-btn variant="text" v-bind="props" append-icon="mdi-chevron-down">{{ user.data.name}}</v-btn>
    </template>
    <v-list class="text-center" density="compact">
     <v-list-item title="PROFILE" router :to ="{ name:'Profile', params:{id: user.data.id} }"/>
    <v-list-item @click="logout" title="LOGOUT" />
    </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script setup>
 import router from '@/router';
import { useAuthStore } from '@/store/AuthStore';
import { useUtilityStore } from "@/store/UtilityStore";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const utilityStore = useUtilityStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const dialog = ref(true)

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
