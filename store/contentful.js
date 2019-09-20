/**
 * Created by nikita on 15/06/2019.
 */
import { get } from 'lodash'
import { getAssets, getContentfulEntities, getEntitiesList } from '~/app/contentful/fetcher'
import { ucFirst } from '~/app/string'

export const state = () => ({
  rawItems: {},
  formHeading: '',
  assets: {
    openGraphImage: ''
  }
})

export const getters = {
  getAssets(state) {
    return state.assets
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const assets = await getAssets()

    const getById = id =>
      item =>
        item.sys.id === id

    const openGraphImage = (() => {
      const baseImage = assets.items
        .find(getById('pniY7pGEg5IhdKRgPZm80'))

      const image = get(baseImage, ['fields', 'file', 'url'], '')
        .concat('?fm=png')

      return 'https:'.concat(image)
    })()

    commit('setOpenGraphImage', openGraphImage)

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

  setOpenGraphImage(state, image) {
    state.assets.openGraphImage = image
  }
}
