<template>
  <div class="default-header">
    <v-toolbar
      class="header"
      flat
      height="80"
    >
      <v-content>
        <v-container pa-0>
          <v-layout
            row
            wrap
            justify-center
            align-end
          >
            <v-flex
              md2
              :xs5="isDevice"
            >
              <v-toolbar-title class="logo">
                <img
                  src="/LogoWhite.svg"
                  class="mojave-logo"
                  alt="Logo"
                >
              </v-toolbar-title>
            </v-flex>
            <v-flex
              md7
              :xs4="isDevice"
            >
              <v-spacer />
            </v-flex>
            <v-flex
              md3
              :offset-xs1="isDevice"
              :xs2="isDevice"
            >
              <div
                v-show="!isDevice"
                class="menu-links"
              >
                <v-btn
                  flat
                  color="white"
                >
                  Articles
                </v-btn>
                <v-btn
                  outline
                  color="white"
                  class="mr-0"
                >
                  Contact us
                </v-btn>
              </div>
              <v-btn
                v-show="isDevice"
                icon
                m-0
                class="mojave-hamburger"
                @click.stop="rightDrawer = !rightDrawer"
              >
                <v-icon
                  size="31"
                  color="white"
                >
                  menu
                </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-toolbar>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="true"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-content>Articles</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Contact us</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content class="information">
      <v-container
        class="pt-0"
        :class="isDevice ? 'pb-64' : 'pb-125'"
      >
        <v-layout wrap>
          <v-flex md12>
            <v-card-text
              flat
              class="mojave"
            >
&nbsp;
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-flex
            md2
            :xs1="isDevice"
          />
          <v-flex
            md7
            :xs11="isDevice"
            :class="isDevice ? 'mobile-title-wrapper' : ''"
          >
            <div class="mojave-title">
              Do more with less.
            </div>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-flex
            v-show="!isDevice"
            md2
          />
          <v-flex
            md8
            :xs11="isDevice"
          >
            <p class="mojave-description">
              Mojave provides the shortest path to customer interactions that elevate your brand,
              with radically low cost of ownership.
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>

export default {

  component: {

  },

  data() {
    return {
      rightDrawer: false
    }
  },

  computed: {
    isDevice() {
      return ['sm', 'xs'].indexOf(this.$vuetify.breakpoint.name) > -1
    }
  }
}
</script>
