<template>
  <div>
    <v-app-bar 
      app
      elevation="0"
      fixed
      elevate-on-scroll
      class="header box-shadow">
      <v-container>
        <v-row justify="space-between" align="center" v-if="$route.name === 'index' || $route.name === 'home'">
          <v-col cols="3" class="px-0">
            <v-btn 
            icon
            color="black"
            class="mr-2">
            <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn
              icon
              color="black"
              class="mr-2"
              :small="$vuetify.breakpoint.name === 'xs' ? true : false">             
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data() {

    },
    watch: {
      
    },
    methods: {
    }
  }
</script>

<style scoped>
  .header {
    background-color: white !important;
    /* box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.2) !important; */
  }
</style>