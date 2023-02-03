<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      dark
      temporary>
      <v-list
        nav
        dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="toUser()">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar 
      app
      elevation="0"
      fixed
      class="header">
      <v-container>
        <v-row justify="space-between" align="center" v-if="$route.name === 'index'">
          <v-col cols="3" class="px-0">
            <v-btn 
              icon
              color="black"
              @click="drawer = true"
              class="mr-2">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn
              v-if="$route.name === 'index'"
              icon
              color="black"
              class="mr-2"
              :small="$vuetify.breakpoint.name === 'xs' ? true : false">             
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>

            <v-btn 
              v-if="$route.name === 'detail-slug'"
              icon 
              color="black"
              class="mr-2 cursor-pointer"
              @click="$router.back()">
              <v-icon color="grey" left class="mr-1">mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-between" align="center" v-if="$route.name === 'users' || $route.name === 'blog-slug'">
          <v-col cols="12" class="d-flex align-center justify-left px-0">
            <v-btn v-if="back"
            icon @click="$router.back()" class="d-flex align-center cursor-pointer">
              <v-icon color="grey" left class="mr-1">mdi-chevron-left</v-icon>
            </v-btn>
            <span v-if="$vuetify.breakpoint.name !== 'xs'" class="text-cut body-1 grey--text text--darken-1"> 
             Kembali
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        back: true,
        items: [
          { title: 'Setting user', icon: 'mdi-account-settings' },
        ],
      }
    },
    watch: {
      
    },
    mounted () {
      console.log('isi route', this.$route);
    },
    methods: {
      toUser() {
        this.$router.push(`/users`)
      }
    }
  }
</script>

<style scoped>
  .header {
    background-color: white !important;
    /* box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.2) !important; */
  }
</style>