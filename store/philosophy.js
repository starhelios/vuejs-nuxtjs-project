import { getHero } from '~/app/contentful/fetcher'

const state = () => ({
  heading: '',
  description: ''
})

const getters = {

  getHeading(state) {
    return state.heading
  },

  getDescription(state) {
    return state.description
  }

}

const actions = {
  async nuxtServerInit({ commit }) {
    const { heading2, description2 } = await getHero()
    commit('setHeading', { heading: heading2 })
    commit('setDescription', { description: description2 })
  }
}

const mutations = {
  setHeading(state, { heading }) {
    state.heading = heading
  },

  setDescription(state, { description }) {
    state.description = description
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
