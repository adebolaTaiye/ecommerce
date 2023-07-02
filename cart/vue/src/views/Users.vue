<template>
  <PageComponent title="Users">
    <template v-slot:header>
      <v-btn
        color="blue-darken-3"
        @click="dialog = !dialog"
        prepend-icon="mdi-plus"
        density="default"
        elevation="4"
        >add new admin</v-btn
      >
    </template>

<v-dialog v-model="dialog" width="500px">
      <v-form @submit.prevent="register">
        <v-card class="px-6 py-8">
      <v-text-field
        label="full name"
        density="compact"
        type=input
        v-model ="user.name"
        variant="outlined"
        color="primary"
      ></v-text-field>
      <v-text-field
        label="email"
        density="compact"
        variant="outlined"
        v-model="user.email"
        type="email"
        color="primary"
      ></v-text-field>
      <v-text-field
        label="password"
        density="compact"
        v-model="user.password"
        variant="outlined"
        type="password"
        color="primary"
        hint="password must be at 8 characters in length"
      ></v-text-field>
      <v-text-field
        label="confirm password"
        density="compact"
        v-model="user.password_confirmation"
        variant="outlined"
        type="password"
        color="primary"
      ></v-text-field>
      <v-btn :loading="loading" type="submit" color="primary">Submit</v-btn>
    </v-card>
    </v-form>
    </v-dialog>
  </PageComponent>
</template>

<script setup>
import PageComponent from "@/components/PageComponent.vue";
import { ref } from "vue";
import { useAuthStore } from '../store/AuthStore'
import { useRouter } from "vue-router";

const authStore = useAuthStore()
const router = useRouter()


const user = ref({
  name : '',
  email : '',
  password : '',
  password_confirmation : ''
})

const loading = ref(false)

const register = async () => {
  loading.value = true
  try{
 await authStore.registerAdmin(user.value)
 router.push({path:'/dashboard'})
 loading.value = false;
  }catch(err){
    loading.value = false;
    console.log(err.response.data.error)
  }
}

const dialog = ref(false);
</script>
