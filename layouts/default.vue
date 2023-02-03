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
    }
  },
  components: {
    Headers,
    Footer
  },
}
</script>
