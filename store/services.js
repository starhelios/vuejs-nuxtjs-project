import { getServices } from '~/app/contentful/fetcher'

const state = () => ({
  primaryServices: [],
  secondaryServices: [],
  servicesHeading: '',
  moreServices: '',
  threeColumnsServices: []
})

const getters = {
  getServicesHeading(state) {
    return state.servicesHeading
  },
  getPrimaryServices(state) {
    return state.primaryServices
  },
  getSecondaryServices(state) {
    return state.secondaryServices
  },
  getMoreServices(state) {
    return state.moreServices
  },
  getThreeColumnsServices(state) {
    return state.threeColumnsServices
  },
  getFromThreeColumnsByIndex: state => index => state.threeColumnsServices[index]
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const {
      primaryServices,
      secondaryServices,
      servicesHeading,
      moreServices,
      threeColumns
    } = await getServices()

    commit('setServicesHeading', { servicesHeading })
    commit('setPrimaryServices', { primaryServices })
    commit('setSecondaryServices', { secondaryServices })
    commit('setMoreServices', { moreServices })
    commit('setThreeColumnsServices', { threeColumns })
  }
}

export const mutations = {
  setServicesHeading(state, { servicesHeading }) {
    state.servicesHeading = servicesHeading
  },
  setPrimaryServices(state, { primaryServices }) {
    state.primaryServices = primaryServices
  },
  setSecondaryServices(state, { secondaryServices }) {
    state.secondaryServices = secondaryServices
  },
  setMoreServices(state, { moreServices }) {
    state.moreServices = moreServices
  },
  setThreeColumnsServices(state, { threeColumns }) {
    state.threeColumnsServices = threeColumns
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
