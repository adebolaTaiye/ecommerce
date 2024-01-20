<template>
  <PageComponent title="Profile">
    <v-form @submit.prevent="update">
      <v-card class="px-6 py-8">
        <transition-group name="fade">
          <div
          class="bg-error mb-4 px-4 py-2 rounded d-flex justify-space-between"
          v-for="(error, index) in errors"
          :key="index"
        >
          <div v-for="(singleError, index) in error" :key="index">
            {{ singleError }}
          </div>
           <span
              ><v-btn
                icon="mdi-alpha-x-circle"
                density="compact"
                @click="errors = null"
                variant="plain"
              ></v-btn
            ></span>
        </div>
        </transition-group>
        <v-text-field
          label="full name"
          density="compact"
          type="input"
          v-model="user.name"
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
        <v-btn :loading="loading" type="submit" color="primary">Update</v-btn>
      </v-card>
    </v-form>
  </PageComponent>
</template>

<script setup>
import PageComponent from "@/components/PageComponent.vue";
import { useAuthStore } from "@/store/AuthStore";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";


const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

watch(
  () => authStore.userId,
  (newVal, oldVal) => {
    user.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
  }
);

const errors = ref("");
const loading = ref(false);

const user = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const update = async () => {
  loading.value = true;
  try {
    await authStore.saveAdmin(user.value);
    router.push("/users");
    loading.value = false;
  } catch (err) {
    loading.value = false;
    if (err.response.status === 422) {
      errors.value = err.response.data.errors;
    }
  }
};
if (route.params.id) {
  authStore.getUser(route.params.id);
}
</script>
<style scoped>
     .fade-enter-from {
      opacity: 0
    }

    .fade-enter-active{
        transition: 1s ease;
    }

    .fade-leave-to {
      opacity: 0
    }
    .fade-leave-active{
      transition: 0.5s ease;
    }
</style>
