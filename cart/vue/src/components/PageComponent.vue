<template>
  <div class="bg-grey-lighten-4 h-100" >
    <header class=" px-5 py-4">
        <div class="d-flex d-flex justify-space-between">
          <div class=" text-lg-h4 text-md-h4 text-sm-h4 text-h5 font-weight-bold ">
            {{ title }}
          </div>
          <slot name="header"></slot>
        </div>
      </header>
      <main>
          <div class="px-4">
          <slot></slot>
          </div>
      </main>
  </div>
</template>

<script setup>
 const props = defineProps({
        title:String
    })
</script>


