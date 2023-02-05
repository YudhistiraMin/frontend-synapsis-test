export const state = () => ({
    detail: {},
    list_comments: [],
  })
  
  export const getters = {
   
  }
  
  export const mutations = {
    SET_DETAIL(state, detail_item) {
      state.detail = detail_item
    },

    SET_LIST_COMMENTS(state, list_comments) {
      state.list_comments = list_comments
    },

    SET_ADD_COMMENT(state, payload) {
      state.list_comments.push({
        id: payload.id,
        post_id: payload.post_id,
        name: payload.name,
        email: payload.email,
        body: payload.body
      })
    }
  }
  
  export const actions = {
    async getDetail(state, blog_id) {
      this.$axios.get(`posts/${blog_id}`)
      .then((response) => {
        state.commit('SET_DETAIL', response.data)
      });
    },

    async fetchComments(state, blog_id) {
      this.$axios.get(`posts/${blog_id}/comments`)
      .then((response) => {
        state.commit('SET_LIST_COMMENTS', response.data)
      })
    },

    async addReview(state, payload) {
      this.$axios.post(`posts/${payload.post}/comments`, payload)
      .then((response) =>{
       state.commit('SET_ADD_COMMENT', response.data)
      })
    }
  }