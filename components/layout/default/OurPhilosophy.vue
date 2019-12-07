<template>
  <div>
    <LayoutRow
      classes="our-phil"
      y-pad-auto
    >
      <v-container pb-0>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm6
            class="heading"
          >
            <img
              class="mb-4"
              height="60px"
              :src="getAsset('best-practices')"
              alt="Best practices for best brands"
            >
          </v-flex>

          <v-flex
            xs12
            sm6
            class="description"
          >
            <h1
              v-for="(desc, k) in description"
              :key="k"
            >
              {{ desc.content[0].value }}
            </h1>
          </v-flex>
        </v-layout>
      </v-container>
    </LayoutRow>

    <LayoutRow
      classes="our-phil"
      y-pad-auto
      y-no-top
    >
      <brand-images />
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
    }),
    ...mapGetters('contentful', ['getAsset'])
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
      margin-top: -6px;
      padding-left: 48px;

      & h1 {
        font-family: Georgia, serif !important;
        font-size: 14px !important;
        font-style: normal;
        font-feature-settings: normal;
        font-variant: normal;
        font-weight: 400;
        line-height: 20px;
      }
		}
	}

  & .description h1 {
    font-size: 15px !important;
    font-style: normal;
    font-feature-settings: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 16px;
  }
}
</style>
