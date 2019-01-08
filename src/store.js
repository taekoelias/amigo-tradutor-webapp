import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      messages: [],
      errors:[]
    },
    mutations: {
      removeError (state,{index}) {
        state.errors.splice(index,1);
      },
      removeMessage (state,{index}) {
        state.messages.splice(index,1);
      }
    },
    actions: {
      removeError ({ commit }, index) {
        commit('removeError',index)
      },
      removeMessage ({ commit }, index) {
        commit('removeMessage', index)
      }
    }
  })

export default store