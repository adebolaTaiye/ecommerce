<template>
  <div class=" h-screen d-flex flex-column justify-center align-center" >
    <v-icon icon="mdi-cart-outline " color="green" size="large"></v-icon>
    <!--FORM ERRORS -->
    <div class="text-h5 font-weight-bold mb-3">sign in</div>
    <transition-group name="fade">
      <div
        class="bg-error mb-4 px-4 py-2 rounded"
        v-for="(error, index) in errors"
        :key="index"
      >
        <div
          v-for="(singleError, index) in error"
          :key="index"
          class="d-flex justify-space-between"
        >
          {{ singleError }}
          <span
            ><v-btn
              icon="mdi-alpha-x-circle"
              density="compact"
              @click="errors = null"
              variant="plain"
            ></v-btn
          ></span>
        </div>
      </div>
    </transition-group>

    <transition name="fade">
      <div
        v-if="invalid"
        class="bg-error mb-4 px-4 py-2 rounded d-flex justify-space-between"
      >
        {{ invalid }}
        <span
          ><v-btn
            icon="mdi-alpha-x-circle"
            density="compact"
            @click="invalid = null"
            variant="plain"
          ></v-btn
        ></span>
      </div>
    </transition>
    <!--FORM -->
    <v-form style="width: 300px" @submit.prevent="login">
      <v-text-field
        label="email"
        type="email"
        v-model="user.email"
        density="compact"
        variant="outlined"
        color="primary"
        class="rounded-md"
      ></v-text-field>
      <v-text-field
        label="password"
        type="password"
        v-model="user.password"
        density="compact"
        color="primary"
        variant="outlined"
        rounded-pill
      ></v-text-field>

      <v-checkbox
        v-model="user.rememberme"
        color="primary"
        label="Remember me"
      ></v-checkbox>
      <v-btn :loading="loading" color="primary" type="submit" class="pt-2" block>
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
const errors = ref("");
const invalid = ref("");

const login = async () => {
  loading.value = true;
  user.submit;

  try {
    await authStore.loginAdmin(user.value);
    router.push("/dashboard");
    loading.value = false;
  } catch (err) {
    loading.value = false;
    if (err.response.status === 422) {
      errors.value = err.response.data.errors;
      invalid.value = err.response.data.error;
    }
    console.log(invalid);
  }
};
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: 1s ease;
}

.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: 0.5s ease;
}
</style>
