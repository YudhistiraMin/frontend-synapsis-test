<template>
  <v-footer 
    class="py-1"
    elevation="0"
    color="white"
    :max-height="$vuetify.breakpoint.name === 'xs' ? 62 : 62"
    fixed>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="text-center">
            <v-card-text>
              Syanpsis©{{ new Date().getFullYear() }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
     
    },
    watch: {
     
    },
    mounted () {
    },
    methods: {
      
    }
  }
</script>