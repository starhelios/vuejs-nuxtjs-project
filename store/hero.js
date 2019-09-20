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

export const actions = {
  async nuxtServerInit({ commit }) {
    const { heading, description } = await getHero()
    commit('setHeading', { heading })
    commit('setDescription', { description })
  }
}

export const mutations = {

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
  getters,
  actions,
  mutations
}
