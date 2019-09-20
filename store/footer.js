import { getFooter } from '~/app/contentful/fetcher'

const state = () => ({
  heading: '',
  copyright: '',
  links: []
})

const getters = {
  getHeading(commit) {
    return commit.heading
  },
  getCopyright(commit) {
    return commit.copyright
  },
  getLinks(commit) {
    return commit.links
  }
}

const actions = {
  async nuxtServerInit({ commit }) {
    const {
      heading,
      copyright,
      links
    } = await getFooter()

    commit('setHeading', { heading })
    commit('setCopyright', { copyright })
    commit('setLinks', { links })
  }
}

const mutations = {
  setHeading(commit, { heading }) {
    commit.heading = heading
  },
  setCopyright(commit, { copyright }) {
    commit.copyright = copyright
  },
  setLinks(commit, { links }) {
    commit.links = links
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
