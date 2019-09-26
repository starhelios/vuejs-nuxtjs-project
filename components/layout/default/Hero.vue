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
            src="/img/headings/domorewithless-mobile.svg"
            alt="Do more with less"
          >
          <img
            class="hidden-xs-only mb-4"
            height="26px"
            src="/img/headings/domorewithless-desktop.svg"
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
		}
	}

	@media screen and (min-width: 600px) {
		& .heading {
			padding-right: 48px;
		}

		& .services {
			padding-left: 48px;
		}
	}
}
</style>
