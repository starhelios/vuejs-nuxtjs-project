<template>
  <v-content class="our-philosophy">
    <v-container
      class="smooth"
    >
      <div
        class="flex our-philosophy-bg px-4 pt-5"
        :class="{'pb-5': mdAndUp,'pt-5': mdAndUp,'pt-1': smAndDown,'pb-4': smAndDown}"
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            md12
            offset-xs0
            offset-sm1
            offset-md1
            class="smooth"
          >
            <div class="h1 our-philosophy-title">
              {{ heading }}
            </div>
          </v-flex>
        </v-layout>
        <brand-images />
        <v-layout
          row
          wrap
          :class="{'pt-3': smAndDown}"
          class="our-philosophy-body"
        >
          <v-flex
            class="smooth"
            offset-xs0
            offset-sm1
            offset-md1
            offset-lg1
            offset-xl1
            md10
          >
            <p
              v-for="(desc, k) in description"
              :key="k"
              :class="{'custom-text-offset': mdAndUp}"
              class="smooth"
            >
              {{ desc.content[0].value }}
            </p>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>
<script>
import { mapGetters } from 'vuex'
import BrandImages from '~/components/lists/BrandImages.vue'

export default {
  components: {
    BrandImages
  },

  data() {
    return {
      isHydrated: false
    }
  },

  computed: {
    mdAndUp() {
      return this.isHydrated ? this.$vuetify.breakpoint.mdAndUp : false
    },
    smAndUp() {
      return this.isHydrated ? this.$vuetify.breakpoint.smAndUp : false
    },
    smAndDown() {
      return this.isHydrated ? this.$vuetify.breakpoint.smAndDown : false
    },

    ...mapGetters({
      'heading': 'philosophy/getHeading',
      'description': 'philosophy/getDescription'
    })

  },

  mounted() {
    this.isHydrated = true
  }
}
</script>
