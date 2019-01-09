import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  messages: [],
  errors:[]
};

Vue.directive('delay', {
  bind: function (el, binding, vnode) {
   setTimeout(binding.value, 3000)
  }
})

const mutations = {
  removeError (state,{index}) {
    state.errors.splice(index,1);
  },
  removeMessage (state,{index}) {
    state.messages.splice(index,1);
  }
}

const actions = {
  removeError ({ commit }, index) {
    commit('removeError',index)
  },
  removeMessage ({ commit }, index) {
    commit('removeMessage', index)
  }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
  })

export default store