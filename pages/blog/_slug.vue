<template>
  <div :class="$vuetify.breakpoint.name === 'xs' ? 'mt-12 mb-16' : 'mt-0'">
    <!-- dialog review -->
    <v-dialog
      persistent
      v-model="dialog.review">
      <v-card
        class="pa-3 ma-0"
        flat>
        <v-card-title class="pt-1 mb-5">Write review</v-card-title>
        <v-form class="mt-5">
          <ValidationObserver ref="observer">
            <v-card-text>
              <div class="mb-4">
                <ValidationProvider name="nama" rules="required" v-slot="{ errors }">
                <div class="d-flex mb-3">
                  <span class="caption">Name</span>
                  <span class="required-sign">*</span>
                </div>
                <v-text-field
                  dense
                  :disabled="process.load"
                  color="black"
                  :error-messages="errors"
                  v-model="form.name"
                  required>
                </v-text-field>
                </ValidationProvider>
              </div>
              <div class="mb-4">
                <ValidationProvider  name="email" rules="email|required" v-slot="{ errors }">
                <div class="d-flex mb-3">
                  <span class="caption">Email</span>
                  <span class="required-sign">*</span>
                </div>
                <v-text-field
                  dense
                  :disabled="process.load"
                  color="black"
                  :error-messages="errors"
                  v-model="form.email"
                  required>
                </v-text-field>
                </ValidationProvider>
              </div>
              <div class="mb-4">
                <ValidationProvider name="gender" rules="required" v-slot="{ errors }">
                  <div class="d-flex mb-3">
                    <span class="caption">Content</span>
                    <span class="required-sign">*</span>
                  </div>
                  <v-textarea
                    color="black"
                    :disabled="process.load"
                    :error-messages="errors"
                    v-model="form.body"
                    required>
                  </v-textarea>
                </ValidationProvider>
              </div>
            </v-card-text>
          </ValidationObserver>
        </v-form>
        <v-card-actions class="justify-center">
          <v-btn
            small
            width="70"
            color="#F5F5F5"
            elevation="0"
            light
            :disabled="process.load"
            class="text-capitalize"
            @click="reset(); $refs.observer.reset();">
            Tutup
          </v-btn>
         
          <v-btn
            small
            :loading="process.load"
            :disabled="process.load"
            width="120" 
            color="black"
            elevation="0"
            class="white--text text-capitalize"
            @click="save();">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end dialog review -->
    <section class="mt-5 mb-7 px-5">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card class="pa-5">
              <div class="title mb-7 font-weight-bold">
                {{detail.title}}
              </div>
              <div class="body-2 font-weight-regular">
                {{detail.body}}
              </div>
              <v-list two-line>
                <v-subheader class="title px-0 font-weight-bold mt-7">Comments</v-subheader>
                <div v-for="(item, index) in comments" :key="index">
                  <v-divider v-if="index"></v-divider>
                  <v-list-item-content class="mb-3"  v-if="$store.state.list_comments.length > 0">
                    <v-list-item-title class="font-weight-bold line-text-third body-1">{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text--secondary subtitle">{{ item.email }}</v-list-item-subtitle>
                    <div class="mt-5 body-2">
                      {{ item.body }}
                    </div>
                  </v-list-item-content>
                </div>

                <div v-if="$store.state.list_comments.length < 1">
                  <div class="h1 font-weight-bold mb-5">
                    No comment for now
                  </div>
                </div>
              </v-list>
              <div>
                <v-btn 
                  class="white--text mt-2"
                  color="black"
                  @click="dialog.review = true">
                  Write a review
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: {
        review: false
      },
      form: {
        id: '',
        name: '',
        email: '',
        body: '',
      },
      process: {
        load: false
      }
    }
  },
  computed: {
    detail() {
      return this.$store.state.detail
    },
    comments() {
      return this.$store.state.list_comments
    }
  },
  mounted () {
    this.$store.dispatch('getDetail', this.$route.params.slug);
    this.$store.dispatch('fetchComments', this.$route.params.slug);
  },
  methods: {
    async save() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.create();
      }
    },

    create() {
      this.process.load = true
      this.$store.dispatch('addReview', {
        post: this.$route.params.slug,
        name: this.form.name,
        email: this.form.email,
        body: this.form.body,
      })
      this.process.load = false
      this.reset();
    },
    
    reset() {
      this.dialog.review = !this.dialog.review ? true : false
      this.form = {
        id: '',
        name: '',
        email: '',
        body: '',
      }
    },
  },
}
</script>