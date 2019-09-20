export const strict = false

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, app }) {
    await dispatch('contentful/nuxtServerInit')
    await dispatch('contact/nuxtServerInit')
    await dispatch('hero/nuxtServerInit')
    await dispatch('services/nuxtServerInit')
    await dispatch('philosophy/nuxtServerInit')
    await dispatch('article/nuxtServerInit')
    await dispatch('footer/nuxtServerInit')
    await dispatch('header/nuxtServerInit')
  }
}
