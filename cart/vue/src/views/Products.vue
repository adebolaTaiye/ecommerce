<template>
  <PageComponent title="Products">
    <template v-slot:header>
      <v-btn
        color="blue-darken-3"
        @click="event"
        prepend-icon="mdi-plus"
        density="default"
        >add product</v-btn
      >
    </template>

    <!--display of properties -->
    <div class=" d-flex flex-column justify-center align-center" v-if="products.loading">
      <v-progress-circular :size="50" color="primary" :width="6" indeterminate>
      </v-progress-circular>
    </div>
    <div v-else>
      <!-- search form -->

      <v-text-field
        density="compact"
        color="primary"
        label="search"
        v-model="search"
        @input="searchProduct"
        variant="outlined"
        type="search"
        append-inner-icon="mdi-magnify"
      >
      </v-text-field>

      <div class="py-4">
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Image</th>
              <th class="text-left">Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Category</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products.data" :key="index">
              <td>{{ product.id }}</td>
              <td><v-img :src="product.image_url" height="60"></v-img></td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.category }}</td>
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
                          @click="
                            (dialog = !dialog) && productStore.getProduct(product.id)
                          "
                          >Edit</v-btn
                        >
                        <v-btn
                          prepend-icon="mdi-delete"
                          class="bg-red"
                          @click="deleteProduct(product.id)"
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
        <div class="text-center py-5">
          <v-pagination
            v-model="page"
            :length="products.links.last_page"
            @click="productStore.getPage(page)"
            color="primary"
            elevation="3"
            active-color="blue"
            variant="outlined"
            border="3"
          >
          </v-pagination>
        </div>
      </div>
    </div>
    <!--dialog for edit and creating products -->
    <v-dialog v-model="dialog" width="800">
      <v-card class="px-6 py-8 overflow-auto">
        <transition-group name="fade">
          <div
            class="bg-red mb-4 px-4 py-2 rounded d-flex justify-space-between"
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
        <v-card-text>
          <v-form @submit.prevent="addNewProduct">
            <v-text-field
              label="product name"
              type="text"
              class="rounded-pill"
              v-model="product.name"
              density="compact"
              variant="outlined"
              color="primary"
            ></v-text-field>
            <v-select
              :items="categories.data"
              item-title="name"
              item-value="name"
              label="choose category"
              v-model="product.category"
              density="compact"
              color="primary"
              single-line
            >
            </v-select>
            <v-textarea
              name="name"
              variant="outlined"
              v-model="product.description"
              label="product description"
              color="primary"
              auto-grow=""
            >
            </v-textarea>
            <v-text-field
              label="product quantity"
              type="number"
              v-model="product.quantity"
              class="rounded-pill"
              density="compact"
              variant="outlined"
              color="primary"
            ></v-text-field>
            <v-text-field
              label="product price"
              class="rounded-pill"
              v-model="product.price"
              density="compact"
              type="number"
              variant="outlined"
              color="primary"
            ></v-text-field>
            <v-file-input
              label="select image"
              variant="outlined"
              @change="onImageChoose"
              prepend-icon="mdi-camera"
              color="primary"
            >
            </v-file-input>
            <div class="d-flex justify-space-between">
              <p class="font-weight-bold text-h5">Sizes</p>
              <v-btn color="primary" prepend-icon="mdi-plus" @click="addSizeOptions()"
                >Add Options</v-btn
              >
            </div>
            <div
              v-for="(option, index) in product.sizes"
              :key="option.uuid"
              class="d-flex justify-space-between py-4"
            >
              <span class="w-6 text-sm">{{ index + 1 }}</span>
              <v-text-field
                class="rounded-pill"
                density="compact"
                v-model="option.text"
                type="text"
                variant="outlined"
                color="primary"
              ></v-text-field>
              <v-btn
                color="red"
                variant="plain"
                icon="mdi-delete"
                @click="removeSizeOption(index)"
              ></v-btn>
            </div>
            <div v-if="!product.sizes.length">you don't have any options</div>
            <div class="d-flex justify-space-between">
              <p class="font-weight-bold text-h5">Colors</p>
              <v-btn color="primary" prepend-icon="mdi-plus" @click="addColorOptions()"
                >Add Colors</v-btn
              >
            </div>
            <div class="mb-4" v-if="!product.colors.length">
              you don't have any options
            </div>
            <div
              v-for="(option, index) in product.colors"
              :key="option.uuid"
              class="d-flex justify-space-between py-4"
            >
              <span class="w-6 text-sm">{{ index + 1 }}</span>
              <v-text-field
                class="rounded-pill"
                density="compact"
                v-model="option.text"
                type="text"
                variant="outlined"
                color="primary"
              ></v-text-field>
              <v-btn
                color="red"
                variant="plain"
                icon="mdi-delete"
                @click="removeColorOption(index)"
              ></v-btn>
            </div>
            <v-btn :loading="loading" type="submit" color="primary">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </PageComponent>
</template>

<script setup>
import PageComponent from "@/components/PageComponent.vue";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/store/CategoryStore";
import { useProductStore } from "@/store/ProductStore";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { watch } from "@vue/runtime-core";

const categoryStore = useCategoryStore();
const productStore = useProductStore();

const { categories } = storeToRefs(categoryStore);
const { products, currentProduct } = storeToRefs(productStore);

const loading = ref(false);

const search = ref("");

const product = ref({
  name: "",
  category: null,
  description: null,
  quantity: null,
  price: null,
  image: null,
  sizes: [],
  colors: [],
});

function resetForm() {
  product.value.category = null;
  product.value.name = null;
  product.value.description = null;
  product.value.quantity = null;
  product.value.price = null;
  product.value.image = null;
  product.value.sizes = [];
  product.value.colors = [];
}

function event() {
  dialog.value = !dialog.value;
  errors.value = "";
  productStore.currentProduct.data.sizes= []
  productStore.currentProduct.data.colors= []
}

function deleteProduct(product) {
  if (confirm("are you sure you want to delete this product!!")) {
    productStore.deleteProduct(product);
    productStore.getProducts();
  }
}

const searchProduct = async () => {
  try {
    await productStore.searchProduct(search.value);
  } catch (err) {
    console.log(err);
  }
};
const page = ref(1);

watch(
  () => productStore.currentProduct.data,
  (newVal, oldVal) => {
    product.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
  }
);

const onImageChoose = (ev) => {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    product.value.image = reader.result;
  };
  reader.readAsDataURL(file);
};

const getSizeOptions = () => {
  return product.value.sizes;
};

const setSizeOptions = (options) => {
  product.value.sizes = options;
};

const addSizeOptions = () => {
  setSizeOptions([...getSizeOptions(), { uuid: uuidv4(), text: "" }]);
};

const removeSizeOption = (index) => {
  getSizeOptions().splice(index, 1);
};

const getColorOptions = () => {
  return product.value.colors;
};

const setColorOptions = (options) => {
  product.value.colors = options;
};

const addColorOptions = () => {
  setColorOptions([...getColorOptions(), { uuid: uuidv4(), text: "" }]);
};

const removeColorOption = (index) => {
  getColorOptions().splice(index, 1);
};
const dialog = ref(false);
const errors = ref("");

const addNewProduct = async () => {
  loading.value = true;
  try {
    await productStore.saveProduct(product.value);
    dialog.value = false;
    productStore.getProducts();
    loading.value = false;
  } catch (err) {
    if (err.response.status === 422) {
      errors.value = err.response.data.errors;
    }
    loading.value = false;
  }
};

categoryStore.getCategories();
productStore.getProducts();
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
