import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logoFonts: [],
  },
  mutations: {
      updateLogoFonts(state,fonts){
        state.logoFonts = fonts
      }
  },
  actions: {

  }
})
