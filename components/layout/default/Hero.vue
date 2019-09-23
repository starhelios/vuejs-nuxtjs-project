<template>
	<LayoutRow classes="header" yPadAuto>
    <v-container>
			<v-layout row wrap>
				<v-flex xs12
								sm6
								mt-3
								class="heading">
					<h1 class="mb-4">{{ heading }}</h1>
					<p>{{ description }}</p>
				</v-flex>

				<v-flex xs12
								sm6
								mt-3
								class="services">
					<h3 v-for="service in allServices">{{ service }}. </h3>
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
		allServices () {
			return [...this.primaryServices, ...this.secondaryServices]
		}
  }
}
</script>

<style lang="scss">
.header {
	& .services {
		& h3 {
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
