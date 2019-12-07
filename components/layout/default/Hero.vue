<template>
  <LayoutRow
    classes="header"
    y-pad-auto
  >
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          mt-3
          class="heading"
        >
          <img
            class="hidden-sm-and-up mb-4"
            height="56px"
            :src="getAsset('domorewithless-mobile')"
            alt="Do more with less"
          >
          <img
            class="hidden-xs-only mb-4"
            height="26px"
            :src="getAsset('domorewithless-desktop')"
            alt="Do more with less"
          >
          <p>{{ description }}</p>
        </v-flex>

        <v-flex
          xs12
          sm6
          mt-3
          class="services"
        >
          <h1
            v-for="(service, index) in allServices"
            :key="index"
          >
            {{ service }}.
          </h1>
        </v-flex>
      </v-layout>
    </v-container>
  </LayoutRow>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutRow from '@/components/layout/LayoutRow'

export default {
  components: {
    LayoutRow
  },
  computed: {
    ...mapGetters({
      'heading': 'hero/getHeading',
      'description': 'hero/getDescription',
      primaryServices: 'services/getPrimaryServices',
      secondaryServices: 'services/getSecondaryServices'
    }),
    ...mapGetters('contentful', ['getAsset']),
    allServices() {
      return [...this.primaryServices, ...this.secondaryServices]
    }
  }
}
</script>

<style lang="scss">
.header {
	& .services {
		& h1 {
			display: inline;
			font-style: italic;
			font-weight: normal;
			font-size: 130%;
      font-family: Georgia, serif !important;
      line-height: -5px;
      word-spacing: 0.2rem;
		}
  }
  

	@media screen and (min-width: 600px) {
		& .heading {
			padding-right: 48px;
		}

		& .services {
			padding-left: 24px;
		}
	}
}
</style>
