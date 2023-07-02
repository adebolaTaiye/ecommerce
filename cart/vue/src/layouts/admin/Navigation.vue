<template>
  <div >
    <v-navigation-drawer permanent>
     <v-list density="compact" v-for="item in navigation" :key="item" nav>
      <v-list-item :prepend-icon="item.icon" :title="item.name" :value="item.name" router :to="item.to" active-color="primary" />

     </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
  const navigation = [
    {name:'Dashboard', icon:'mdi-view-dashboard', to:'/dashboard'},
    {name:'Users', icon:'mdi-cog', to:'/users'},
    {name:'Categories', icon:'mdi-cog', to:'categories'},
    {name:'Products', icon:'mdi-cog', to:'/products'},
    {name:'Message', icon:'mdi-message-alert', to:''},
  ]
</script>
