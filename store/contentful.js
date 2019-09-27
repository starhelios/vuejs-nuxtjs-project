/**
 * Created by nikita on 15/06/2019.
 */
import { getAssets, getContentfulEntities, getEntitiesList } from '~/app/contentful/fetcher'
import { ucFirst } from '~/app/string'

export const state = () => ({
  rawItems: {},
  formHeading: '',
  assets: {}
})

export const getters = {
  getAsset: state => (asset) => {
    const found = state.assets.items.find(item => item.fields.title === asset)

    return found
      ? found.fields.file.url
      : false
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const assets = await getAssets()

    commit('setAssets', assets)

    const output = await getContentfulEntities()
    const entitiesList = getEntitiesList()

    entitiesList.forEach((entity) => {
      commit(
        'setRaw',
        { name: entity, items: output['pull' + ucFirst(entity)] }
      )
    })
  }
}

export const mutations = {
  setRaw(state, variables) {
    state.rawItems[variables.name] = variables.items
  },

  setFormHeading(state, title) {
    state.formHeading = title
  },

  setAssets(state, assets) {
    state.assets = assets
  }
}
