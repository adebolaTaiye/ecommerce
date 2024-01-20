<template>
  <PageComponent title="Categories">
    <template v-slot:header>
      <v-btn
        color="blue-darken-3"
        @click="event"
        prepend-icon="mdi-plus"
        density="default"
        elevation="4"
        >add category</v-btn
      >
    </template>
    <div class="d-flex justify-center align-center" v-if="categories.loading">
      <v-progress-circular :size="50" color="primary" :width="6" indeterminate>
      </v-progress-circular>
    </div>
    <div v-else>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">SN</th>
            <th class="text-left">Name</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories.data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ category.name }}</td>
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
                        @click="(edit = !edit) && categoryStore.getCategory(category.id)"
                        >Edit</v-btn
                      >
                      <v-btn
                        prepend-icon="mdi-delete"
                        class="bg-red"
                        @click="
                          deleteCategory(category.id)
                        "
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
      <v-dialog v-model="dialog" width="400">
        <v-form @submit.prevent="addNewCategory">
          <v-card class="px-6 py-8">
            <transition-group name="fade">
               <div
            class="bg-red mb-4 px-4 py-2 rounded d-flex justify-space-between"
            v-for="(error, index) in errors"
            :key="index"
          >
            <div v-for="(singleError, index) in error" :key="index">
              {{ singleError }}
            </div>
            <span><v-btn icon="mdi-alpha-x-circle" density="compact" @click="errors = null" variant="plain" ></v-btn></span>
          </div>
            </transition-group>
            <v-text-field
              label="enter category"
              density="compact"
              type="input"
              variant="outlined"
              v-model="cat.name"
              color="primary"
            ></v-text-field>
            <v-btn :loading="loading" type="submit" color="primary">Submit</v-btn>
          </v-card>
        </v-form>
      </v-dialog>
      <v-dialog v-model="edit" width="400">
        <v-form @submit.prevent="addNewCategory">
          <v-card class="px-6 py-8">
            <v-text-field
              label="enter category"
              density="compact"
              type="input"
              variant="outlined"
              v-model="cat.name"
              color="primary"
            ></v-text-field>
            <v-btn :loading="loading" type="submit" color="primary">update</v-btn>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from "@/components/PageComponent.vue";
import { ref } from "vue";
import { useCategoryStore } from "@/store/CategoryStore";
import { storeToRefs } from "pinia";
import { watch } from "@vue/runtime-core";

const categoryStore = useCategoryStore();

const cat = ref({
  name:"",
});

/*function resetForm() {
  cat.value.name ='';
}*/

function event() {
  dialog.value = !dialog.value;
  errors.value = ''
  categoryStore.category = null
}

watch(
  () => categoryStore.category,
  (newVal, oldVal) => {
    cat.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
  }
);

const errors = ref('')
const loading = ref(false);

categoryStore.getCategories();

const addNewCategory = async () => {
  loading.value = true;
  try {
    await categoryStore.saveCategory(cat.value);
    dialog.value = false;
    categoryStore.getCategories();
    loading.value = false;
  } catch (err) {
    loading.value = false;
    if(err.response.status === 422){
      errors.value = err.response.data.errors;
    }
  }
};

function deleteCategory(id) {
   if (confirm("are you sure you want to delete this category!!")){
    categoryStore.deleteCategory(id)
    categoryStore.getCategories()
   }
}

const { category, categories } = storeToRefs(categoryStore);

const dialog = ref(false);
const edit = ref(false);
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
