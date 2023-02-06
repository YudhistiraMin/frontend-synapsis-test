// import qs from "qs"

export default function ({ $axios }) {
  // $axios.defaults.paramsSerializer = function(params) {
  //   return qs.stringify(params)
  // }
  
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = `Bearer d418a957eedd13a42a6e8cb64ba2cf17a375763a0ce5cf2b34bd69d28aa5bcb7`
    // config.headers.common['token'] = `${store.state.member.auth.token}`
  })
}

