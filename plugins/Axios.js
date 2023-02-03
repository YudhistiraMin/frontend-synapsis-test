import qs from "qs"

export default function ({ $axios }) {
  $axios.defaults.paramsSerializer = function(params) {
    return qs.stringify(params)
  }

  $axios.onRequest(config => {
    config.headers.common['Authorization'] = process.env.API_SECRET
    // config.headers.common['token'] = `${store.state.member.auth.token}`
  })
}

