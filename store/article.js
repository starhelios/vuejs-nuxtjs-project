import { getArticles } from '~/app/contentful/fetcher'

const state = () => ({
  articles: []
})

const getters = {
  getArticles: state => state.articles
}

const actions = {

  async nuxtServerInit({ commit }) {
    const articles = await getArticles()

    commit('setArticles', { articles })
  }

}

const mutations = {
  setArticles(state, { articles }) {
    state.articles = articles
      .map(i => ({
        ...i,
        image: i.image.concat('?w=500')
      }))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
