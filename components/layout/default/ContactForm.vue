<template>
  <v-content class="contact-form">
    <v-container
      class="smooth"
      :class="getContainerClass()"
    >
      <v-layout
        ref="contactFormRef"
        row
        wrap
        :pl-1="xs"
        class="smooth"
      >
        <v-flex
          :mt-5="smAndUp"
          :mt-2="xs"
          xs12
          md12
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              class="smooth"
              offset-xs1
              offset-sm1
              offset-md0
              offset-lg0
              offset-xl0
              xs9
              sm9
              md10
              lg11
              xl11
              :mt-2="smAndUp"
              :mt-5="xs"
            >
              <div class="h1 contact-form-title">
                {{ formHeading || contactFormHeading }}
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          :mt-4="smAndUp"
          :mt-2="xs"
          offset-xs1
          offset-sm1
          offset-md3
          offset-lg3
          offset-xl3
          xs10
          sm10
          md6
          lg6
          xl6
        >
          <contact-form />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import ContactForm from '~/components/forms/Contact.vue'

export default {

  components: {
    ContactForm
  },

  data() {
    return {
      isHydrated: false
    }
  },

  computed: {
    smAndUp() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.smAndUp
        : false
    },
    xs() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.xs
        : false
    },
    contactForm() {
      return this.isHydrated && this.$store.state.contentful.rawItems.contactForm &&
                    this.$store.state.contentful.rawItems.contactForm.length > 0
        ? this.$store.state.contentful.rawItems.contactForm[0].fields
        : false
    },
    contactFormHeading() {
      return this.isHydrated && this.contactForm
        ? this.contactForm.heading
        : ''
    },
    formHeading() {
      return this.isHydrated && this.$store.state.contentful.formHeading
        ? this.$store.state.contentful.formHeading
        : ''
    },
    contactFormRef: {
      get() {
        return this.isHydrated
          ? this.$store.state.header.setContactFormRef
          : false
      },
      set(value) {
        this.$store.commit('header/setContactFormRef', value)
      }
    }
  },

  mounted() {
    this.isHydrated = true
    this.contactFormRef = this.$refs.contactFormRef
  },

  methods: {

    getContainerClass() {
      return {
        'mt-5': this.smAndUp,
        'pa-0': this.smAndUp,
        'pt-5': this.smAndUp,
        'mt-3': this.xs,
        'ml-0': this.xs,
        'pl-4': this.xs,
        'pt-0': this.xs
      }
    }

  }
}
</script>
