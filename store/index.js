export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  getWordList(state) {
    return state.wordList
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (req.session.user) {
      this.$auth.setUser(req.session.user)
    } else {
      this.$auth.setUser(null)
    }
  },
  storeWordList({commit}, wordList) {
    commit('STORE_WORD_LIST', wordList)
  }
}

export const state = () => ({
  wordList: []
})

export const mutations = {
  STORE_WORD_LIST(state, wordList) {
    state.wordList = wordList
  }
}
