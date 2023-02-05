<template>
  <div>
    <!-- snackbar -->
    <v-snackbar
      v-model="snackbar"
      color="green lighten-2"
      tile
      top
      right
      class="white--text"
      :timeout="timeout">
      {{ text }}
    </v-snackbar>
    <!-- end snackbar -->

    <!-- dialog tambah pengguna -->
    <v-dialog
      persistent
      v-model="dialog.add">
      <v-card
        class="pa-3 ma-0"
        flat>
        <v-card-title class="pt-1 mb-5">Tambah pengguna</v-card-title>
        <v-form class="mt-5">
          <ValidationObserver ref="observer">
            <v-card-text>
              <div class="mb-4">
                <ValidationProvider name="nama" rules="required" v-slot="{ errors }">
                <div class="d-flex mb-3">
                  <span class="caption">Nama pengguna</span>
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
                    <span class="caption">Jenis kelamin</span>
                    <span class="required-sign">*</span>
                  </div>
                  <v-select
                    dense
                    :disabled="process.load"
                    :items="[
                      {
                        label: 'Laki-laki',
                        value: 'male'
                      },
                      {
                        label: 'Perempuan',
                        value: 'female'
                      },
                    ]"
                    item-text="label"
                    item-value="value"
                    :error-messages="errors"
                    item-color="indigo darken-1"
                    v-model="form.gender"
                    color="black">
                  </v-select>
                </ValidationProvider>
              </div>
              <div class="mb-4">
                <ValidationProvider name="status" rules="required" v-slot="{ errors }">
                  <div class="d-flex mb-3">
                    <span class="caption">Status</span>
                    <span class="required-sign">*</span>
                  </div>
                  <v-select
                    dense
                    :disabled="process.load"
                    :items="[
                      {
                        label: 'Aktif',
                        value: 'active'
                      },
                      {
                        label: 'Tidak aktif',
                        value: 'inactive'
                      },
                    ]"
                    item-text="label"
                    item-value="value"
                    :error-messages="errors"
                    item-color="indigo darken-1"
                    v-model="form.status"
                    color="black">
                  </v-select>
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
    <!-- end dialog tambah artikel -->

    <!-- dialog hapus -->
    <v-dialog v-model="dialog.delete" 
      persistent
      width="350">
      <v-card class="pa-5">
        <v-card-text>
          Apakah anda yakin menghapus
          <span class="font-weight-bold">
           {{form.name}}
          </span>
          ?
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            small
            outlined
            class="text-capitalize mx-1"
            :disabled="process.load"
            @click="dialog.delete = false">
            <v-icon color="black" small class="mr-1">mdi-close-circle</v-icon>
            Tidak
          </v-btn>
          <v-btn
            small
            color="black"
            elevation="3"
            class="text-capitalize white--text mx-1"
            :loading="process.load"
            :disabled="process.load"
            @click="deletes()">
            <v-icon small class="mr-1">mdi-trash-can</v-icon>
            Ya, hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end dialog hapus -->

    <!-- list pengguna -->
    <section class="px-5" :class="$vuetify.breakpoint.name === 'xs' ? 'mb-15 mt-15' : 'mt-5 mb-7'">
      <v-container>
        <div class="d-flex justify-space-between align-center">
          <div class="body-1 mb-2 color-head font-weight-bold">User list</div>
          <v-btn
            text
            class="font-weight-bold"
            dense
            @click="dialog.add = true;">
            <v-icon>mdi-plus</v-icon>
            Add user
          </v-btn>
        </div>
        <v-row v-show="!process.run" class="mb-3 mt-0" justify="center" align="start">
          <v-col cols="12">
            <v-text-field
              rounded
              dense
              hide-details
              filled
              color="black"
              clearable
              v-model="searching"
              v-on:keyup.enter="fetch()"
              @click:clear="searching = ''; fetch();"
              placeholder="Cari pengguna">
              <template v-slot:prepend-inner>
                <v-icon color="#bfbfbf" class="mr-2">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" v-show="process.run">
          <v-col  v-for="(p, run) in 5" :key="run" cols="12" class="py-0">
            <v-skeleton-loader
              type="image"
              class="mb-10 mt-10"
              transition="scale-transition"
              :loading="process.run">
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-show="!process.run" v-if="list_users.length > 0">
          <v-col cols="12" v-for="(item, index) in list_users" :key="index">
            <v-hover v-slot:default="{ hover }">
              <v-card class="box-shadow mb-10 pa-3 cursor-pointer border-radius">
                <v-card-title class="title">{{item.name}}</v-card-title>
                <v-card-subtitle class="subtitle">{{ item.email }}</v-card-subtitle>
                <v-card-text>
                  <div>
                    Gender : {{ item.gender }}
                  </div>
                  <div>
                    Status: {{ item.status }}
                  </div>
                </v-card-text>

                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out black lighten-2 v-card--reveal display-3 white--text"
                    style="height: 100%;">
                    <v-btn
                      class="mr-3 red--text"
                      color="white"
                      small
                      @click="form.id = item.id; form.name = item.name; dialog.delete = true">
                      <v-icon class="mr-1" small color="red">mdi-trash-can</v-icon>
                        Delete
                      </v-btn>
                      <v-btn
                        color="white"
                        class="green--text"
                        small
                        @click="reset(item)">
                        <v-icon class="mr-1" small color="green">mdi-pencil</v-icon>
                        Edit
                    </v-btn>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <v-row class="my-10 text-center" v-if="list_users.length < 1">
          <v-col cols="12">
            <div class="h1 font-weight-bold">
              {{ this.contentEmpty }}
            </div>
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
      contentEmpty:'',
      dialog: {
        add: false,
        delete: false
      },
      form: {
        id: '',
        name: '',
        email: '',
        gender: '',
        status: ''
      },
      searching: '',
      list_users: [],
      snackbar: false,
      text: '',
      timeout: 5000,
      page: 1,
      perPage: 5,
      process: {
        run: false,
        load: false
      },
    }
  },
  components: {},
  watch: {
    // 'searching': function(val) {
    //   if (val.length >= 2) {
    //     setTimeout(() => {
    //       this.fetch();
    //     }, 2000);
    //   } else if (val.length < 1) {
    //     this.fetch();
    //   }
    // }
  },
  computed: {
  },
  mounted () {
   this.fetch();
  },
  methods: {
    async fetch() {
      const params = {
        name: this.searching,
        page: this.page,
        per_page: this.perPage
      }
      this.process.run = true
      await this.$axios.$get(`/users`, {params})
      .then((response) => {
        if(response) {
          this.process.run = false
          this.process.load = false
          this.list_users = response
          if (this.list_users.length < 1) {
            this.contentEmpty = 'Data tidak ditemukan'
          }
        } else {
          this.process.run = false
          this.process.load = false
        }
      });
    },

    async save() {
      const isValid = await this.$refs.observer.validate()
      const cek = this.form.id === '';
      if (isValid) {
        if (cek) {
          this.create();
        } else {
          this.update();
        }
      }
    },

    async create() {
      this.process.load = true
      await this.$axios.$post(`/users`, {
        email: this.form.email,
        name: this.form.name,
        gender: this.form.gender,
        status: this.form.status,
      })
      .then((response) => {
        this.reset()
        this.fetch()
        this.text = 'Data berhasil ditambahkan'
        this.snackbar = true
      })
    },

    async update() {
      this.process.load = true
      await this.$axios.$put(`/users/${this.form.id}`, {
        email: this.form.email,
        name: this.form.name,
        gender: this.form.gender,
        status: this.form.status,
      })
      .then((response) => {
        this.reset()
        this.fetch()
        this.text = 'Data berhasil diubah'
        this.snackbar = true
      })
      .catch((error) => {

      })
    },

    async deletes() {
      this.process.load = true
      await this.$axios.$delete(`/users/${this.form.id}`)
      .then((response) => {
        this.form = {
          id: '',
          name: ''
        }
        this.fetch()
        this.dialog.delete = false;
        this.text = 'Data berhasil dihapus'
        this.snackbar = true
      })
    },
    
    reset(item) {
      this.dialog.add = !this.dialog.add ? true : false
      this.form = {
        id: item !== undefined ? item.id : '',
        name: item !== undefined ? item.name : '',
        email: item !== undefined ? item.email : '',
        gender: item !== undefined ? item.gender : '',
        status: item !== undefined ? item.status : ''
      }
    },

    changePage(val) {
      if (val === 'prev') {
        this.page = this.page - 1;
      } else {
        this.page = this.page + 1;
      }
      this.fetch();
    }
  },
}
</script>

<style scoped>  
.required-sign {
  color: red;
  margin-left: 5px;
}
.cursor-pointer {
  cursor: pointer;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .6;
  position: absolute;
  left: 0;
  width: 100%;
  border-radius: 10px;
}
</style>