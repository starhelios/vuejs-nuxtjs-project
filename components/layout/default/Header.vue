<template>
  <header class="default-header">
    <div
      class="default-header-wrapper"
      :style="{'margin': '0 auto'}"
    >
      <v-toolbar
        class="header px-4"
        flat
        height="80"
      >
        <v-layout
          px-0
          row
          wrap
          justify-center
          align-end
        >
          <v-flex
            flex
            xs9
            sm9
            md8
          >
            <nuxt-link to="/">
              <v-toolbar-title class="logo">
                <div
                  class="mojave-logo"
                  alt="Logo"
                />
              </v-toolbar-title>
            </nuxt-link>
          </v-flex>
          <v-flex
            xs2
            md4
            offset-xs1
            offset-md0
          >
            <div
              v-show="!isDevice"
              class="menu-links"
            >
              <v-btn
                v-for="(menuLink, i) in menuLinks"
                :key="`menu-links${i}`"
                color="white"
                :flat="menuLink.class !== 'contactUs'"
                :style="{'height': menuLink.class !== 'contactUs' ? '50px' : false, 'visibility': menuLink.class === 'articles' ? 'hidden' : false}"
                :outline="menuLink.class === 'contactUs'"
                :class="menuLink.class === 'contactUs' ? 'contact-us mr-0' : ''"
                @click="menuAction(menuLink.class)"
              >
                {{ menuLink.name }}
              </v-btn>
            </div>
            <v-btn
              v-show="isDevice"
              icon
              m-0
              class="mojave-hamburger"
              @click.stop="showMenu"
            >
              <div class="hamburger">
                <div class="hamburger-line" />
                <div class="hamburger-line" />
                <div class="hamburger-line" />
              </div>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-navigation-drawer
        v-model="rightDrawer"
        :right="true"
        temporary
        fixed
        class="menu-hover px-4"
        :width="currentWidth"
      >
        <v-toolbar
          class="header px-0"
          flat
          height="80"
        >
          <v-layout
            row
            wrap
            justify-center
            align-end
          >
            <v-flex
              v-if="mdAndUp"
              xs0
              sm1
              md1
            >
&nbsp;
            </v-flex>
            <v-flex
              flex
              xs9
              sm9
              md8
            >
              <v-toolbar-title class="logo">
                <div
                  class="mojave-logo"
                  alt="Logo"
                />
              </v-toolbar-title>
            </v-flex>
            <v-flex
              offset-xs1
              xs2
              offset-md0
              md3
            >
              <v-btn
                icon
                m-0
                class="mojave-hamburger"
                @click.stop="showMenu"
              >
                <div class="close-icon" />
              </v-btn>
            </v-flex>
          </v-layout>
        </v-toolbar>
        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
        <!-- temporary fix to avoid changing end-user experience -->
        <v-layout
          v-for="(menuLink, i) in menuLinks"
          v-if="menuLink.class !== 'articles'"
          :key="`slide-menu${i}`"
          row
          wrap
          ma-0
          mt-5
          pa-0
          px-0
        >
          <v-flex
            xs11
            sm10
            md10
            lg10
            xl10
            offset-xs0
            offset-md1
          >
            <span
              class="h1 services-header"
              style="margin-top:0"
              @click="menuAction(menuLink.class, true)"
            >
              {{ menuLink.name }}
            </span>
          </v-flex>
        </v-layout>

        <div style="position: fixed; bottom: 30px; width: 97%">
          <v-layout
            row
            wrap
            px-0
          >
            <v-flex
              xs10
              sm10
              md10
              lg10
              xl10
              offset-xs0
              offset-sm0
              offset-md1
            >
              <div class="h3 follow-us">
                {{ heading }}
              </div>
            </v-flex>
            <v-flex
              xs11
              sm10
              md6
              offset-xs0
              offset-sm0
              offset-md1
              mt-3
            >
              <div class="social-media text-xs-left text-md-left">
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    v-for="(link, i) in links"
                    :key="`links${i}`"
                    shrink
                    :offset-xs0="i === 0"
                    :offset-xs1="i !== 0"
                    :offset-sm0="i === 0"
                    :offset-sm1="i !== 0"
                    :offset-md0="i === 0"
                    :offset-lg0="i === 0"
                    :offset-xl0="i === 0"
                  >
                    <a
                      :href="link.href"
                      target="_blank"
                    >{{ link.text }}</a>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-navigation-drawer>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

  component: {

  },

  data() {
    return {
      isHydrated: false
    }
  },

  computed: {
    rightDrawer: {
      get() {
        return this.isHydrated
          ? this.$store.state.header.rightDrawer
          : false
      },
      set(value) {
        this.$store.commit('header/updateRightDrawer', value)
      }
    },

    mdAndUp() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.mdAndUp
        : false
    },

    smAndUp() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.smAndUp
        : false
    },

    isDevice() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.mdAndDown
        : false
    },
    ...mapGetters({
      'heading': 'footer/getHeading',
      'links': 'footer/getLinks',
      'menuLinks': 'header/getMenuLinks'
    }),
    currentWidth() {
      return this.isHydrated
        ? this.$vuetify.breakpoint.width
        : 300
    },
    contactFormRef() {
      return this.isHydrated && this.$store.state.header.contactFormRef
        ? this.$store.state.header.contactFormRef
        : false
    }
  },

  mounted() {
    this.isHydrated = true
  },

  methods: {

    showMenu() {
      this.rightDrawer = !this.rightDrawer
    },

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
