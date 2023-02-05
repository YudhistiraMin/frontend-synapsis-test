<template>
  <div>
    <!-- list blog -->
    <section class="px-5" :class="$vuetify.breakpoint.name === 'xs' ? 'mb-15 mt-15' : 'mt-5 mb-7'">
      <v-container>
        <div class="d-flex justify-space-between align-center">
          <div class="body-1 mb-2 color-head font-weight-bold">Blog list</div>
        </div>
        <v-row justify="center" v-show="process.run">
          <v-col  v-for="(p, run) in 5" :key="run" cols="12" class="py-0">
            <v-skeleton-loader
              type="image"
              transition="scale-transition"
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
        <v-row justify="center">
          <v-col cols="4">
            <v-btn
              :disabled="page === 1"
              class="white--text"
              color="black"
              @click="changePage('prev')">
            <v-icon>mdi-chevron-left</v-icon>
              Prev
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="white--text"
              color="black"
              @click="changePage('next')">
              Next
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
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
      page: 1,
      perPage: 5,
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
      const params = {
        page: this.page,
        per_page: this.perPage
      }
      this.process.run = true
      await this.$axios.$get(`/posts`, {params})
      .then((response) =>{
        if (response) {
          this.process.run = false;
          this.list_blog = response;
        } else {
          this.process.run = false
        }
      })
    },

    changePage(val) {
      if (val === 'prev') {
        this.page = this.page - 1;
      } else {
        this.page = this.page + 1;
      }
      this.fetch();
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