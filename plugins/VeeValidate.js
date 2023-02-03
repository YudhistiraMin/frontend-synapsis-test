import Vue from 'vue'
import { required, max, min, email} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

extend('required', {
  ...required,
  message: 'Kolom tidak boleh kosong'
})

extend('max', {
  ...max,
  message: 'Kolom maksimal {length} karakter'
})

extend('min', {
  ...min,
  message: 'Kolom minimal {length} karakter'
})

extend('email', {
...email,
message: 'Kolom email belum benar'
})


Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  }
}