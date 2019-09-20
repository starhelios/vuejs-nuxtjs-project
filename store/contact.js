import { getField, updateField } from 'vuex-map-fields'
import { getContactForm } from '~/app/contentful/fetcher'

const initialState = {
  textFields: [],
  choices: [],
  selectedChoices: [],
  heading: '',
  choicesHeading: '',
  disclaimer: '',
  acceptDisclaimer: '',
  sendButton: '',
  submitValidationError: '',
  serverSideError: '',
  submitSuccess: ''
}

const state = () => ({
  ...initialState
})

const getters = {
  getField,

  getHeading(state) {
    return state.heading
  },

  getChoicesHeading(state) {
    return state.choicesHeading
  },

  getDisclaimer(state) {
    return state.disclaimer
  },

  getAcceptDisclaimer(state) {
    return state.acceptDisclaimer
  },

  getSendButton(state) {
    return state.sendButton
  },

  getSubmitValidationError(state) {
    return state.submitValidationError
  },

  getServerSideError(state) {
    return state.serverSideError
  },

  getSubmitSuccess(state) {
    return state.submitSuccess
  }
}

const actions = {
  async nuxtServerInit({ commit }) {
    const {
      textFields,
      choices,
      heading,
      choicesHeading,
      disclaimer,
      acceptDisclaimer,
      sendButton,
      submitValidationError,
      serverSideError,
      submitSuccess
    } = await getContactForm()

    commit('initTextFields', {
      textFields
    })

    commit('initChoices', {
      choices
    })

    commit('initHeading', {
      heading
    })

    commit('initChoicesHeading', {
      choicesHeading
    })

    commit('initDisclaimer', {
      disclaimer
    })

    commit('initAcceptDisclaimer', {
      acceptDisclaimer
    })

    commit('initSendButton', {
      sendButton
    })

    commit('initSubmitValidationError', {
      submitValidationError
    })

    commit('initServerSideError', {
      serverSideError
    })

    commit('initSubmitSuccess', {
      submitSuccess
    })
  }
}

const mutations = {
  updateField,

  initTextFields(state, { textFields }) {
    state.textFields = [ ...textFields ]
      .map(field => ({
        label: field.text,
        name: field.name,
        required: field.required,
        validation: field.validation,
        value: ''
      }))
  },

  initChoices(state, { choices }) {
    state.choices = [ ...choices ]
      .map(field => ({
        label: field.text,
        name: field.name,
        required: field.required,
        validation: field.validation,
        value: ''
      }))
  },

  initHeading(state, { heading }) {
    state.heading = heading
  },

  initChoicesHeading(state, { choicesHeading }) {
    state.choicesHeading = choicesHeading
  },

  initDisclaimer(state, { disclaimer }) {
    state.disclaimer = disclaimer
  },

  initAcceptDisclaimer(state, { acceptDisclaimer }) {
    state.acceptDisclaimer = acceptDisclaimer
  },

  initSendButton(state, { sendButton }) {
    state.sendButton = sendButton
  },

  initSubmitValidationError(state, { submitValidationError }) {
    state.submitValidationError = submitValidationError
  },

  initServerSideError(state, { serverSideError }) {
    state.serverSideError = serverSideError
  },

  initSubmitSuccess(state, { submitSuccess }) {
    state.submitSuccess = submitSuccess
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
