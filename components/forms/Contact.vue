<template>
  <v-layout row wrap class="contact-form">
    <vue-form
      ref="form"
      class="w-100"
      :state="formState"
      @submit.prevent="onSubmit"
    >
      <v-alert
        v-show="formState.$submitted && !isPending && (isFormRequestFailed || formState.$invalid || isFormSended)"
        ref="validationMessage"
        :type="isFormSended && formState.$valid ? 'success' : 'error'"
        class="w-100"
      >
        <span v-if="formState.$invalid">{{ submitValidationError }}</span>
        <span v-if="isFormRequestFailed">{{ serverSideError }}</span>
        <span v-if="isFormSended">{{ submitSuccess }}</span>
      </v-alert>

      <v-flex
        v-if="!isFormSended"
        class="smooth"
        md12
        :ml-2="smAndUp"
        mt-3
      >
        <div class="form-header">
          {{ choicesHeading }}
        </div>
      </v-flex>
      <v-flex
        v-if="!isFormSended"
        xs12
        sm12
        md12
        class="checkbox-group"
      >
        <v-layout
          :ml-2="smAndUp"
          :mt-2="smAndUp"
          row
          wrap
        >
          <v-flex
            v-for="(checkbox, i) in choices"
            :key="`checkboxWrapper${i}`"
            shrink
            class="smooth"
            xs12
            sm12
            md12
            xl12
            lg12
            :class="getCheckboxWrapperClasses(checkbox)"
          >
            <checkbox
              v-model="selectedChoices"
              :name="checkbox.name"
              :text="checkbox.label"
              :error-message="checkboxErrorMessage(formState, checkbox)"
            />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        v-if="!isFormSended"
        :mt-4="smAndUp"
        :ml-2="smAndUp"
        :mr-1="smAndUp"
        :pr-3="xs"
        xs12
        md12
      >
        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
        <!-- temporary fix to avoid chaning end-user experience -->
        <v-layout
          v-for="(field, name) in textFields"
          :key="`form${name}`"
          row
          wrap
        >
          <v-flex class="contact-input">
            <validate
              tag="label"
              :custom="{ ...customValidation(formState, field) }"
            >
              <v-text-field
                v-if="field.name !== 'message'"
                v-model="field.value"
                :required="field.required"
                :name="field.name"
                :type="inputType(formState, field)"
                :max-length="inputMaxLength(formState, field)"
                :error-messages="errorMessage(formState, field)"
              >
                <!-- eslint-disable vue/no-v-html -->
                <span
                  slot="label"
                  v-html="field.label"
                />
              </v-text-field>
              <v-textarea
                v-else-if="field.name === 'message'"
                v-model="field.value"
                :required="field.required"
                :name="field.name"
                :error-messages="errorMessage(formState, field)"
                auto-grow
                rows="1"
              >
                <!-- eslint-disable vue/no-v-html -->
                <span
                  slot="label"
                  v-html="field.label"
                />
              </v-textarea>
            </validate>
          </v-flex>
        </v-layout>

        <v-flex class="text-left">
          <!-- eslint-disable vue/no-v-html -->
          <blockquote v-html="disclaimer"
                      :class="{'mt-2': smAndUp, 'mt-4': xs, 'px-0': xs, 'pt-2': xs, 'pl-0': true}"/>
        </v-flex>

        <v-layout row wrap>
          <v-flex pt-1 pr-0 pb-2 pl-1 ml-0 mr-0>
            <validate tag="label"
                      :custom="{ disclaimerValidation }">
              <checkbox
                v-model="selectedChoices"
                name="agreement"
                :text="acceptDisclaimer"
                :error-message="checkboxErrorMessage(formState, { name: 'agreement', required: true })"
              />
            </validate>
          </v-flex>
        </v-layout>

        <v-btn class="send-request ma-0 mt-4"
                dark depressed
                color="#edb348"              
                :disabled="(formState.$submitted && formState.$invalid) || isPending"
                type="submit">
          {{ isPending ? 'Sending...' : sendButton }}
        </v-btn>
      </v-flex>
    </vue-form>
  </v-layout>
</template>
<script>
import VueForm from 'vue-form'
import { createHelpers } from 'vuex-map-fields'
import { mapMutations, mapGetters } from 'vuex'
import scrollIntoView from 'scroll-into-view'
import Checkbox from '~/components/Checkbox'

const { mapFields } = createHelpers({
  getterType: 'contact/getField',
  mutationType: 'contact/updateField'
})

export default {

  name: 'ContactPage',

  components: {
    Checkbox
  },

  mixins: [VueForm],

  data() {
    return {
      formState: {},
      isHydrated: false,
      isPending: false,
      isFormRequestFailed: false,
      isFormSended: false
    }
  },

  computed: {
    ...mapFields([
      'textFields',
      'choices',
      'selectedChoices'
    ]),
    ...mapGetters({
      heading: 'contact/getHeading',
      choicesHeading: 'contact/getChoicesHeading',
      disclaimer: 'contact/getDisclaimer',
      acceptDisclaimer: 'contact/getAcceptDisclaimer',
      sendButton: 'contact/getSendButton',
      submitValidationError: 'contact/getSubmitValidationError',
      serverSideError: 'contact/getServerSideError',
      submitSuccess: 'contact/getSubmitSuccess'
    }),

    smAndUp() {
      return this.isHydrated ? this.$vuetify.breakpoint.smAndUp : false
    },

    xs() {
      return this.isHydrated ? this.$vuetify.breakpoint.xs : false
    }
  },

  async mounted() {
    this.isHydrated = true
    try {
      await this.$recaptcha.init()
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.error('Google re-captcha error')
    }
  },

  methods: {

    errorMessage(formState, field) {
      if (((formState[field.name] && formState[field.name].$touched) ||
        formState.$submitted) &&
        formState.$error[field.name]) {
        const err = formState.$error[field.name].$error
        if (err.required) {
          return 'required'
        } else if (err.email) {
          return 'email is invalid'
        } else if (err.phone) {
          return 'phone is invalid'
        }
      } else {
        return ''
      }
    },

    checkboxErrorMessage(formState, field) {
      if (!this.selectedChoices.includes(field.name) && field.required && formState.$submitted) {
        return 'required'
      } else {
        return ''
      }
    },

    inputMaxLength(formState, field) {
      switch (field.validation) {
        case 'name':
          return 50
        case 'message':
          return 10
        default:
          return false
      }
    },

    inputType(formState, field) {
      switch (field.validation) {
        case 'email':
          return 'email'
        default:
          return 'text'
      }
    },

    customValidation(formState, field) {
      switch (field.validation) {
        case 'phone':
          return {
            // eslint-disable-next-line no-useless-escape
            phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(field.value)
          }
        default:
          return {}
      }
    },

    disclaimerValidation(value) {
      return value.find(name => name === 'agreement')
    },

    async onSubmit() {
      this.isFormRequestFailed = false
      if (this.formState.$valid) {
        try {
          const token = await this.$recaptcha.execute('login')

          const textFields = this.textFields
            .reduce((state, field) => ({
              ...state,
              [field.name]: field.value
            }), {})

          const subscriptions = this.selectedChoices

          const formData = {
            ...textFields,
            subscriptions
          }

          if (token) {
            this.isPending = true
            await this.$axios.post(
              `${process.env.FIREBASE_URL}/app/subscribeEmail`,
              formData
            )
            this.isFormSended = true
            this.isPending = false
            this.scrollToMessage()
          }
        } catch (e) {
          this.isPending = false
          this.isFormRequestFailed = true
          this.scrollToMessage()
        }
      } else {
        this.scrollToMessage()
      }
    },

    ...mapMutations({
      setFormHeading: 'contentful/setFormHeading'
    }),

    getCheckboxWrapperClasses(checkbox) {
      return {
        'checkbox-wrapper': true,
        'pt-1': true,
        'pr-2': this.smAndUp,
        'pb-2': this.smAndUp,
        'pr-1': this.xs,
        'pb-1': this.xs,
        'pl-1': true,
        'mr-2': this.smAndUp,
        'mt-1': true,
        'ml-1': this.smAndUp,
        'mb-1': this.smAndUp
      }
    },

    scrollToMessage() {
      scrollIntoView(this.$refs.validationMessage.$el, {
        time: 1000,
        align: {
          top: 0
        }
      })
    }
  }
}
</script>

<style lang="scss">
.contact-form {
  // Submit button restyling
  button.send-request[type="submit"] {
    border-radius: 0px;
    width: auto !important;

    &:hover {
      &::before {
        background-color: rgb(253,244,215) !important;
      }

      & .v-btn__content {
        color: rgb(234,180,69) !important;
      }
    }

    &.v-btn--disabled {
      &::before {
        background-color: lightgrey !important;
      }

      & .v-btn__content {
        color: grey !important;
      }    
    }
  }
  blockquote p {
    font-family: Georgia, serif !important;
  }
}
</style>