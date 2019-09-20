import { getMainNavigation } from '~/app/contentful/fetcher'

export const state = () => ({
  rightDrawer: false,
  contactFormRef: {},
  menuLinks: []
})

const getters = {
  getMenuLinks: state => state.menuLinks
}

const actions = {
  async nuxtServerInit({ commit }) {
    const { menuLinks } = await getMainNavigation()
    commit('setMenuLinks', { menuLinks })
  }
}

export const mutations = {
  updateRightDrawer(state, value) {
    state.rightDrawer = value
  },
  setContactFormRef(state, ref) {
    state.contactFormRef = ref
  },
  setMenuLinks(state, { menuLinks }) {
    state.menuLinks = menuLinks
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
