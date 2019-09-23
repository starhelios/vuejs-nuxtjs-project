<template>
	<v-container py-0>
		<v-layout row
							wrap justify-content-around
							class="justify-space-around">
			<v-flex v-for="(image, i) in getImages()"
							:key="`image${i}`"
							class="pa-1 brand shrink align-center">
				<img height="25px" :src="getImagePath(image)">
			</v-flex>
		</v-layout>
	</v-container>
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
