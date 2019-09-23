<template>
	<LayoutRow classes="articles" yPadAuto>
		<v-container>
			<v-layout wrap row>
				<v-flex	xs12 sm4 mb-3>
					<img height="26px" src="/img/headings/articles.svg">
				</v-flex>

				<v-flex xs12 sm8>
					<articles />
				</v-flex>
			</v-layout>
		</v-container>
	</LayoutRow>
</template>

<script>
import { get } from 'lodash'
import Articles from '~/components/lists/Articles'
import LayoutRow from '@/components/layout/LayoutRow'

export default {
  components: {
		Articles,
		LayoutRow
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

<style lang="scss">
.articles {
	background-color: rgb(248, 248, 248);
}
</style>
