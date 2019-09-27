<template>
  <LayoutRow
    classes="contact-form"
    y-pad-auto
  >
    <a
      name="contact_us"
    />
    <v-container>
      <v-layout
        wrap
        row
      >
        <v-flex
          xs12
          sm4
          mb-3
        >
          <img
            height="26px"
            :src="getAsset('contact')"
            alt="Contact mohave"
          >
        </v-flex>

        <v-flex
          xs12
          sm8
        >
          <contact-form />
        </v-flex>
      </v-layout>
    </v-container>
  </LayoutRow>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactForm from '~/components/forms/Contact.vue'
import LayoutRow from '@/components/layout/LayoutRow'

export default {
  components: {
    ContactForm,
    LayoutRow
  },
  data() {
    return {
      isHydrated: false
    }
  },
  computed: {
    ...mapGetters('contentful', ['getAsset']),
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
  }
}
</script>
