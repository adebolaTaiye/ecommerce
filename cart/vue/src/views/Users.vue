<template>
  <PageComponent title="Users">
    <template v-slot:header>
      <v-btn
        color="blue-darken-3"
        @click="event"
        prepend-icon="mdi-plus"
        density="default"
        elevation="4"
        >add admin</v-btn
      >
    </template>
    <!--users table -->
    <div class="d-flex justify-center align-center" v-if="users.loading">
      <v-progress-circular :size="50" color="primary" :width="6" indeterminate>
      </v-progress-circular>
    </div>
    <div class="py-4" v-else>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users.data" :key="index">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <v-chip :color="color(user.role)" class="ma-2" label text-color="white">{{
                user.role
              }}</v-chip>
            </td>
            <td>
              <div class="text-left">
                <v-menu open-on-hover>
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" icon="mdi-dots-vertical"></v-icon>
                  </template>
                  <v-card>
                    <v-card-actions>
                      <v-btn
                        prepend-icon="mdi-square-edit-outline"
                        class="bg-blue"
                        @click="dialog = !dialog && authStore.getUser(user.id)"
                        >Edit</v-btn
                      >
                      <v-btn
                        prepend-icon="mdi-delete"
                        class="bg-red"
                        @click="deleteUser(user.id)"
                        >Delete</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <!--error handling -->
    <transition
    name="fade"
    >
      <div v-if="status"
          class="bg-error px-2 py-4 rounded d-flex justify-space-between"
        >
         <span>{{ status }}</span>
          <span ><v-btn icon="mdi-alpha-x-circle" density="compact" @click="status = null" variant="plain" ></v-btn></span>
        </div >
    </transition>
    <v-dialog v-model="dialog" width="500">
      <v-form @submit.prevent="register">
        <v-card class="px-6 py-8">
          <transition-group name="fade">
              <div
            class="bg-error mb-4 px-4 py-2 rounded "
            v-for="(error, index) in errors"
            :key="index"
          >
            <div v-for="(singleError, index) in error" :key="index" class="d-flex justify-space-between">
              <span>{{ singleError }}</span>
               <span ><v-btn icon="mdi-alpha-x-circle" density="compact" @click="errors = null" variant="plain" ></v-btn></span>
            </div>
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
          <v-btn :loading="loading" type="submit" color="primary">Submit</v-btn>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- user profile -->
  </PageComponent>
</template>

<script setup>
import PageComponent from "@/components/PageComponent.vue";
import { ref, watch } from "vue";
import { useAuthStore } from "../store/AuthStore";
import { useRouter } from "vue-router";
import { setMapStoreSuffix, storeToRefs } from "pinia";
import { useUtilityStore } from "../store/UtilityStore"
import { gsap } from "gsap"

const authStore = useAuthStore();
const utilityStore =  useUtilityStore()
const router = useRouter();
const { users } = storeToRefs(authStore);

watch(
  () => authStore.userId,
  (newVal, oldVal) => {
    user.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
  }
);
function color(role) {
  if (role === "admin") {
    return "blue";
  } else if (role === "superAdmin") {
    return "red";
  } else {
    return "green";
  }
}

const user = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

function resetForm(){
  user.value.name =''
  user.value.email = ''
  user.value.password = ''
  user.value.password_confirmation = ''
}

function event(){
dialog.value = !dialog.value
errors.value = ''
authStore.userId = null
}

const loading = ref(false);

const status = ref("");
const errors = ref("");


const register = async () => {
  loading.value = true;
  try {
    await authStore.saveAdmin(user.value);
    authStore.getUsers();
    dialog.value = false;
    loading.value = false;
  } catch (err) {
    loading.value = false;
    if (err.response.status === 403) {
       dialog.value = false;
     status.value = err.response.data.message;
    }
    if (err.response.status === 422) {
      errors.value = err.response.data.errors;
    }
  }
};

const deleteUser = async(user) => {
  try {
    if (confirm("are you sure you want to delete this user!!")){
     await authStore.deleteUser(user);
      authStore.getUsers();
    }
  } catch(err) {
    if (err.response.status === 403) {
      status.value = "Unauthorized action";
      console.log(status)
    }
  }
}


const dialog = ref(false);
authStore.getUsers();
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
