<template>
  <header>
    <LayoutRow classes="header">
      <v-container>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex>
            <img
              src="/img/LogoYellow.svg"
              alt="Mohave logo"
            >
          </v-flex>
          <v-flex class="text-xs-right">
            <a href="#contact_us">CONTACT US</a>
          </v-flex>
        </v-layout>
      </v-container>
    </LayoutRow>

    <LayoutRow classes="header" />
  </header>
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
      isHydrated: false
    }
  },
  computed: {
    ...mapGetters({
      'heading': 'footer/getHeading',
      'links': 'footer/getLinks',
      'menuLinks': 'header/getMenuLinks'
    })
  },

  methods: {
    getLinkGap(i) {
      return { 'margin-right': i === 0 ? '16px' : (i === 1 ? '23px' : false) }
    },

    menuAction(menuLink, isMobile) {
      isMobile = typeof isMobile === 'undefined' ? false : isMobile
      if (isMobile) {
        this.rightDrawer = false
      }
      if (menuLink === 'contactUs') {
        this.$vuetify.goTo(this.contactFormRef, {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic'
        })
      }
    }

  }
}
</script>

<style lang="scss">
@import "@/assets/css/vars.scss";

.header {
	background-color: white;

	& a {
		text-decoration: none;
		color: black;

		&:hover {
			color: rgb(238, 178, 72);
		}
	}
}
</style>
