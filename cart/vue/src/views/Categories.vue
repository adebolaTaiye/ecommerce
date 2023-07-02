<template>
  <PageComponent title="Categories">
    <template v-slot:header>
      <v-btn
        color="blue-darken-3"
        @click="dialog = !dialog"
        prepend-icon="mdi-plus"
        density="default"
        elevation="4"
        >add new category</v-btn
      >
    </template>
    <div class="d-flex flex-column justify-center align-center" v-if="categories.loading">
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
                        @click="(edit = !edit) && categoryStore.getCategory(category.id)"
                        >Edit</v-btn
                      >
                      <v-btn
                        @click="
                          categoryStore.deleteCategory(category.id) &&
                            categoryStore.getCategories()
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
            <v-text-field
              label="enter category"
              density="compact"
              type="input"
              variant="outlined"
              v-model="category.name"
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
              v-model="category.name"
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
  name: "",
});

watch(
  () => categoryStore.category,
  (newVal, oldVal) => {
    cat.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
  }
);

const loading = ref(false);

categoryStore.getCategories();

const addNewCategory = async () => {
  loading.value = true;
  try {
    await categoryStore.saveCategory(category.value);
    dialog.value= false
    categoryStore.getCategories();
    loading.value = false;
  } catch (err) {
    loading.value = false;
    console.log(err);
  }
};

const { category, categories } = storeToRefs(categoryStore);

const dialog = ref(false);
const edit = ref(false);
</script>

