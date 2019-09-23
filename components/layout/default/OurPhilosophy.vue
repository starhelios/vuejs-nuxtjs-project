<template>
	<div>
		<LayoutRow classes="our-phil" yPadAuto>
			<v-container pb-0>
				<v-layout row wrap>
					<v-flex xs12 sm6 class="heading">
						<img class="mb-4" height="60px" src="/img/headings/best-practices.svg">
					</v-flex>

					<v-flex xs12 sm6 class="description">
						<p v-for="(desc, k) in description"
							:key="k">
							{{ desc.content[0].value }}
						</p>
					</v-flex>
				</v-layout>
			</v-container>
		</LayoutRow>

		<LayoutRow classes="our-phil" yPadAuto yNoTop>
			<brand-images/>
		</LayoutRow>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import BrandImages from '~/components/lists/BrandImages.vue'
import LayoutRow from '@/components/layout/LayoutRow'

export default {
  components: {
		BrandImages,
		LayoutRow
  },
  computed: {
    ...mapGetters({
      'heading': 'philosophy/getHeading',
      'description': 'philosophy/getDescription'
    })
  }
}
</script>

<style lang="scss">
.our-phil {
	background-color: rgb(253, 244, 215);

	@media screen and (min-width: 600px) {
		& .heading {
			padding-right: 48px;
		}

		& .description {
			padding-left: 48px;
		}
	}	
}
</style>