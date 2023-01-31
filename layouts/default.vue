<template>
  <v-app>
    <Headers/>
    <v-sheet light :class="$vuetify.breakpoint.name === 'xs' ? 'my-2' : 'my-16'">
      <nuxt/>
    </v-sheet>
    <Footer/>
  </v-app>
</template>

<script>
import Headers from "~/components/public/Header.vue"
import Footer from "~/components/public/Footer.vue"
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  components: {
    Headers,
    Footer
  },
}
</script>
