export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  
  loggedInUser(state) {
    return state.auth.user
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (req.session.user) {
      this.$auth.setUser(req.session.user)
    }
  }
}