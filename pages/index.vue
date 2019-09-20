<template>
  <div class="featured-stories">
    <v-layout
      wrap
      row
      mt-5
    >
      <v-flex
        offset-xs0
        offset-sm0
        offset-md0
        offset-lg0
        offset-xl0
        :class="getTitleWrapClass()"
      >
        <div class="h1 featured-stories-title">
          Articles
        </div>
      </v-flex>
    </v-layout>

    <articles />

    <v-layout
      v-if="false"
      wrap
      row
    >
      <v-flex
        offset-md10
        md-2
        :mt-1="mdAndUp"
        :mt-4="smAndDown"
        :offset-sm6="smAndDown"
      >
        <div
          class="h3 read-more-stories"
          style=""
        >
          read more stories <div class="read-stories-arrow" />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { get } from 'lodash'
import Articles from '~/components/lists/Articles'

export default {
  components: {
    Articles
  },

  head() {
    return {
      title: get(this.$store.state.contentful, 'rawItems.homePage[0].fields.titleTag', 'Mojave')
    }
  },

  data() {
    return {
      isHydrated: false
    }
  },

  computed: {
    smAndDown() {
      return this.getBreakpointSafe('smAndDown')
    },
    mdAndUp() {
      return this.getBreakpointSafe('mdAndUp')
    }
  },

  mounted() {
    this.isHydrated = true
  },

  methods: {
    getBreakpointSafe(name) {
      return this.isHydrated ? this.getBreakpoint(name) : false
    },

    getBreakpoint(name) {
      return this.$vuetify.breakpoint[name]
    },

    getTitleWrapClass() {
      return {
        'mt-5': this.mdAndUp,
        'mt-3': this.smAndDown,
        'md12': true
      }
    }
  }
}
</script>
