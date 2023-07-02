<template>
  <div class="d-flex flex-column justify-center align-center" style="padding-top: 150px">
    <v-icon icon="mdi-cart-outline " color="green" size="large"></v-icon>
    <h2 class="font-weight-bold pb-6">sign in</h2>
    <v-form style="width: 300px" @submit.prevent="login">
      <v-text-field
        label="email"
        type="email"
        class="rounded-pill"
        v-model="user.email"
        density="compact"
        variant="outlined"
        color="primary"
      ></v-text-field>
      <v-text-field
        label="password"
        type="password"
        v-model="user.password"
        density="compact"
        color="primary"
        variant="outlined"
      ></v-text-field>
      <v-checkbox
        v-model="user.rememberme"
        color="primary"
        label="Remember me"
      ></v-checkbox>
      <v-btn
        :loading="loading"
        color="primary"
        type="submit"
        class="pt-2"
        style="width: 400px"
      >
        Login
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const user = ref({
  email: "",
  password: "",
  rememberme: false,
});
const loading = ref(false);

const login = async () => {
  loading.value = true;

  try {
    await authStore.loginAdmin(user.value);
    router.push("/dashboard");
    loading.value = false;
  } catch (err) {
    loading.value = false;
    console.log(err.response.data.error);
  }
};
</script>
