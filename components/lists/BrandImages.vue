<template>
  <v-container
    py-0
    class="brand-images"
  >
    <v-layout
      row
      wrap
      :justify-space-around="$vuetify.breakpoint.smAndUp"
      :justify-space-between="$vuetify.breakpoint.xsOnly"
    >
      <img
        :src="getAsset('logos-mobile')"
        class="hidden-sm-and-up mb-4"
      >
      <img
        :src="getAsset('logos-desktop')"
        class="hidden-xs-only"
      >
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BrandImages',
  computed: {
    ...mapGetters('contentful', ['getAsset'])
  }
}
</script>

<style lang="scss">
.brand-images {
  & img {
    max-width: 100%;
  }
}
</style>
