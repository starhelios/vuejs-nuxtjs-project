<template>
  <v-app id="mojave">
    <default-header class="mojave-background" />
    <hero />
    <end-to-end-solutions />
    <our-philosophy />
    <v-content class="page ">
      <v-container
        px-4
        py-0
      >
        <nuxt />
      </v-container>
    </v-content>
    <contact-form />
    <default-footer />
  </v-app>
</template>

<script>
import { get } from 'lodash'
import DefaultHeader from '~/components/layout/default/Header.vue'
import Hero from '~/components/layout/default/Hero.vue'
import EndToEndSolutions from '~/components/layout/default/EndToEndSolutions.vue'
import OurPhilosophy from '~/components/layout/default/OurPhilosophy.vue'
import ContactForm from '~/components/layout/default/ContactForm.vue'
import DefaultFooter from '~/components/layout/default/Footer.vue'

export default {

  components: {
    DefaultHeader,
    Hero,
    EndToEndSolutions,
    OurPhilosophy,
    ContactForm,
    DefaultFooter
  },

  data() {
    return {
      isHydrated: false
    }
  },

  head() {
    return {
      meta: [
        { name: 'og:title', hid: 'og:title', content: get(this.$store.state.contentful, 'rawItems.homePage[0].fields.titleTag', 'Mojave') },
        { name: 'og:site_name', hid: 'og:site_name', content: 'Mojave' },
        { name: 'og:description', hid: 'og:description', content: get(this.$store.state.contentful, 'rawItems.homePage[0].fields.heading1', '') },
        { name: 'og:image', hid: 'og:image', content: get(this.$store.getters, ['contentful/getAssets', 'openGraphImage'], '') }
      ]
    }
  },

  computed: {
    smAndUp() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.smAndUp
        : false
    }
  },

  mounted() {
    this.isHydrated = true
  }
}
</script>
