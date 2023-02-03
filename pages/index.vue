<template>
  <div>
    <!-- list blog -->
    <section class="mt-5 mb-7 px-5">
      <v-container>
        <div class="d-flex justify-space-between align-center">
          <div class="body-1 mb-2 color-head font-weight-bold">List blog</div>
        </div>
        <v-row justify="center" v-show="process.run">
          <v-col  v-for="(p, run) in 5" :key="run" cols="12" class="py-0">
            <v-skeleton-loader
              type="image"
              class="mb-10 mt-10"
              :loading="process.run">
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-show="!process.run">
          <v-col cols="12">
            <v-card style="border-radius: 10px" class="box-shadow pa-3 mb-10"  v-for="(item, index) in list_blog" :key="index">
              <v-card-title class="title mb-3">{{item.title}}</v-card-title>
              <v-card-text>
                {{ item.body }}
              </v-card-text>
              <v-card-actions class="text-center">
                <v-btn
                  color="black"
                  class="white--text"
                  @click="toDetail(item)"
                  block>
                  Read more
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>   
    </section>
    <!-- end list blog -->
  </div>
</template>

<script>
export default {
 data() {
    return {
      form: {
        title: '',
        desc: '',
      },
      list_blog:[],
       option: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
          ]
        },
      },
      selected: {
        banner: 0
      },
      process: {
        run: false
      },
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted () {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.process.run = true
      await this.$axios.$get(`/posts`)
      .then((response) =>{
        if (response) {
          this.process.run = false;
          this.list_blog = response;
        } else {
          this.process.run = false
        }
      })
    },

    toDetail(data) {
      this.$router.push(`/blog/${data.id}`)
    }
  }
}
</script>

<style scoped>  
.required-sign {
  color: red;
  margin-left: 5px;
}
</style>