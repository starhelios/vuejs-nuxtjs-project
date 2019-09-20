<template>
  <v-layout
    row
    wrap
    justify-center

    align-center
    class="brand-wrapper"
  >
    <v-flex
      offset-1
    >
&nbsp;
    </v-flex>
    <v-flex
      xs12
      sm10
      md10
      lg10
      xl10
    >
      <v-layout
        row
        wrap
        class="align-center"
        :class="{
          'justify-center': smAndDown
        }"
      >
        <v-flex
          v-for="(image, i) in getImages()"
          :key="`image${i}`"
          class="brand shrink align-center"
          :class="{
            'ml-0': mdAndUp
          }"
        >
          <img
            :src="getImagePath(image)"
          >
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
      xs1
      sm1
      md1
      lg1
      xl1
    >
&nbsp;
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      isHydrated: false,
      images: [
        'Google.svg',
        'P&G.svg',
        'Zelle.svg',
        'Nike.svg',
        'Target.svg',
        'UCSF.svg',
        'Lexus.svg'
      ]
    }
  },

  computed: {
    mdAndUp() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.mdAndUp
        : false
    },
    xs() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.xs
        : false
    },
    smAndDown() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.smAndDown
        : false
    }
  },

  mounted() {
    this.isHydrated = true
  },

  methods: {
    getImagePath(image) {
      return 'best-prictice/' + image
    },

    getImages() {
      return this.images
    },

    getImageClasses(i) {
      return {
        'small': this.smAndDown && i >= 4,
        'position': i >= 3 && this.mdAndUp,
        'position-small': this.mdAndUp && [4, 6].indexOf(i) > -1
      }
    }
  }
}
</script>
