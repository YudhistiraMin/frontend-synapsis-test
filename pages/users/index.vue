<template>
  <div>
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
                  color="black"
                  :error-messages="errors"
                  v-model="form.title"
                  required>
                </v-text-field>
                </ValidationProvider>
              </div>
              <div class="mb-4">
                <ValidationProvider  name="email" rules="email" v-slot="{ errors }">
                <div class="d-flex mb-3">
                  <span class="caption">Email</span>
                  <span class="required-sign">*</span>
                </div>
                <v-text-field
                  dense
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
            rounded
            small
            width="70"
            color="#F5F5F5"
            elevation="0"
            light
            class="text-capitalize"
            @click="dialog.add = false;">
            Tutup
          </v-btn>
         
          <v-btn
            rounded
            small
            width="120" 
            color="black"
            elevation="0"
            class="white--text text-capitalize"
            @click="dialog.add = false">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end dialog tambah artikel -->

    <!-- list pengguna -->
    <section class="mt-5 mb-7 px-5">
      <v-container>
        <div class="d-flex justify-space-between align-center">
          <div class="body-1 mb-2 color-head font-weight-bold">List pengguna</div>
          <v-btn
            text
            class="font-weight-bold"
            dense
            @click="dialog.add = true;">
            <v-icon>mdi-plus</v-icon>
            Tambah pengguna
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
          <v-col  v-for="(p, run) in 5" :key="run" cols="3" class="py-0">
            <v-skeleton-loader
              type="image"
              :loading="process.run">
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-show="!process.run">
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }">
              <div>
                <v-card style="border-radius: 10px" class="box-shadow pa-3 mb-10 cursor-pointer"  v-for="(item, index) in list_users" :key="index">
                  <v-expand-transition>
                    <v-overlay 
                      absolute 
                      :opacity=".5" 
                      :value="hover">
                        <v-btn
                          class="mr-3 red--text"
                          color="white"
                          small>
                          <v-icon class="mr-1" small color="red">mdi-trash-can</v-icon>
                            Hapus
                          </v-btn>
                          <v-btn
                            color="white"
                            class="green--text"
                            small>
                            <v-icon class="mr-1" small color="green">mdi-pencil</v-icon>
                            Ubah
                        </v-btn>
                    </v-overlay>
                  </v-expand-transition>
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
                </v-card>
              </div>
            </v-hover> 
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
      dialog: {
        add: false
      },
      form: {
        title: '',
        email: '',
        gender: '',
        status: ''
      },
      searching: '',
      list_users: [
          {
              "id": 208958,
              "name": "Ms. Devajyoti Johar",
              "email": "johar_ms_devajyoti@goyette.net",
              "gender": "female",
              "status": "inactive"
          },
          {
              "id": 208957,
              "name": "Deven Acharya",
              "email": "acharya_deven@bednar-hagenes.co",
              "gender": "male",
              "status": "active"
          },
          {
              "id": 208956,
              "name": "Satish Kaniyar",
              "email": "satish_kaniyar@weimann-nicolas.io",
              "gender": "female",
              "status": "active"
          },
          {
              "id": 208955,
              "name": "Kumuda Khan",
              "email": "khan_kumuda@klocko.info",
              "gender": "male",
              "status": "active"
          },
          {
              "id": 208954,
              "name": "Kashyapi Bhattathiri",
              "email": "bhattathiri_kashyapi@dietrich.co",
              "gender": "male",
              "status": "active"
          },
          {
              "id": 208953,
              "name": "Amaranaath Achari",
              "email": "achari_amaranaath@farrell-ondricka.com",
              "gender": "male",
              "status": "active"
          },
          {
              "id": 208952,
              "name": "Kanti Dutta Sr.",
              "email": "sr_kanti_dutta@donnelly.co",
              "gender": "male",
              "status": "active"
          },
          {
              "id": 208951,
              "name": "Aditeya Jain CPA",
              "email": "cpa_aditeya_jain@hoppe.name",
              "gender": "male",
              "status": "active"
          },
          {
              "id": 208950,
              "name": "Ms. Samir Achari",
              "email": "samir_ms_achari@runolfsson.info",
              "gender": "male",
              "status": "inactive"
          },
          {
              "id": 208617,
              "name": "Agrata Bharadwaj",
              "email": "agrata_bharadwaj@beier.com",
              "gender": "male",
              "status": "inactive"
          }
      ],
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
    console.log('isi route', this.$route);
  },
  methods: {
    toDetail(data) {
      this.$router.push(`/blog/${data.id}`)
    },
    fetch() {}

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