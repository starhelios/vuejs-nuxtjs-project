<template>
  <footer>
    <LayoutRow classes="footer">
      <v-container>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex class="hidden-xs-only pt-1">
            <img
              :src="getAsset('LogoWhite')"
              alt="Mohave logo"
            >
          </v-flex>

          <v-flex
            xs12
            sm4
            class="text-xs-center"
          >
            <v-layout row>
              <v-flex pt-2>
                <a
                  v-for="(link, i) in linksProcessed"
                  :key="`links${i}`"
                  :href="link.href"
                  target="_blank"
                  :class="{ 'ml-2': i > 0 }"
                >
                  <div
                    :class="link.class"
                    :style="{ 'background-image': getLink(link.currentImage || link.image) }"
                    @mouseover="mouseOver(link)"
                    @mouseout="mouseOut(link)"
                  />
                </a>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex
            xs12
            sm4
            class="text-xs-center text-md-right copyright"
          >
            {{ copyright }}
          </v-flex>
        </v-layout>
      </v-container>
    </LayoutRow>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutRow from '@/components/layout/LayoutRow'

export default {
  components: {
    LayoutRow
  },
  data() {
    return {
      allowedSocial: ['instagram', 'twitter']
    }
  },
  computed: {
    ...mapGetters({
      heading: 'footer/getHeading',
      copyright: 'footer/getCopyright',
      links: 'footer/getLinks'
    }),
    ...mapGetters('contentful', ['getAsset']),
    linksProcessed() {
      return this.links.filter(link => this.allowedSocial.indexOf(link.class) >= 0)
    }
  },
  methods: {
    mouseOver(link) {
      // because this field may not exists first time we must enforce reactivity with $set
      this.$set(link, 'currentImage', link.hoverImage)
    },
    mouseOut(link) {
      link.currentImage = link.image
    },
    getLink(asset) {
      return `url(${this.getAsset(asset)})`
    }
  }
}
</script>

<style lang="scss">
.footer {
	background-color: rgb(133, 196, 205);
	color: white;
	font-size: 110%;

  // Socials
	.instagram, .twitter {
		display: inline-block;
		width: 100px;
		height: 17px;
	}

  .instagram {
		//background-image: url('/img/social/instagram-white.svg');

		&:hover {
			//background-image: url('/img/social/instagram-hover.svg');
		}
  }

  .twitter {
		width: 70px;
		//background-image: url('/img/social/twitter-white.svg');

		&:hover {
			//background-image: url('/img/social/twitter-hover.svg');
		}
  }

	@media screen and (max-width: 600px) {
		padding-top: 36px !important;
		padding-bottom: 36px !important;
	}

	@media screen and (min-width: 600px) {
		padding-top: 20px !important;
		padding-bottom: 20px !important;
	}

	& .copyright {
		font-weight: 100;
		font-family: Georgia, serif !important;

		@media screen and (max-width: 600px) {
			margin-top: 16px;
		}
	}
}
</style>
