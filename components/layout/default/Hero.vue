<template>
  <div class="mojave-background">
    <v-container class="pt-0 px-4 hero hero-bottom-space">
      <v-container pa-0>
        <v-layout wrap>
          <v-flex
            md12
          >
            <v-card-text
              flat
              class="mojave"
            >
&nbsp;
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-flex
            offset-xs0
            offset-sm1
            offset-md1
            offset-lg2
            offset-xl2
            xs12
            sm10
            md10
            lg8
            xl8
            class="hero-pixel-perfect"
          >
            <div class="mojave-title">
              {{ heading }}
            </div>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-flex
            offset-xs0
            offset-sm1
            offset-md1
            offset-lg2
            offset-xl2
            xs12
            sm10
            md10
            lg8
            xl8
            class="hero-pixel-perfect"
          >
            <p class="mojave-description">
              {{ description }}
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isHydrated: false
    }
  },

  computed: {

    xs() {
      return this.isHydrated ? this.$vuetify.breakpoint.xs : false
    },

    mdAndDown() {
      return this.isHydrated ? this.$vuetify.breakpoint.mdAndDown : false
    },

    ...mapGetters({
      'heading': 'hero/getHeading',
      'description': 'hero/getDescription'
    })
  },

  mounted() {
    this.isHydrated = true
  }
}
</script>
