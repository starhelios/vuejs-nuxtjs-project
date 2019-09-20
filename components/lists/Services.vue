<template>
  <v-layout
    row
    wrap
    justify-space-between
    :class="getLayoutClass()"
  >
    <v-flex
      v-for="i in 3"
      :key="`3${i}`"
      :class="getFlexStyles(i)"
      shrink
      xs10
      sm10
      md3
      lg4
      xl3
    >
      <ul
        v-if="(i === 1) || mdAndUp"
        class="services-list smooth shrink"
      >
        <li
          v-for="(item, k) in primaryServices"
          v-show="smAndDown"
          :key="`primary${k}`"
          class="shrink"
        >
          {{ item }}
        </li>

        <li
          v-for="(item, k) in getFromThreeColumnsByIndex(i-1)"
          v-show="!smAndDown"
          :key="`three${k}`"
          class="shrink"
        >
          {{ item }}
        </li>
      </ul>

      <ul
        v-show="(i === threeColumnsServices.length) && smAndDown"
        class="services-list"
        style="margin-top: 0"
        @click="activeMobile"
      >
        <li class="orange-text d-inline-flex align-center">
          <span
            class="more-services-text"
            v-text="moreServices"
          />
          <i
            class="arrow-down"
            :class="{rotated: listActive}"
          />
        </li>
      </ul>

      <ul
        v-show="(i === threeColumnsServices.length) && smAndDown"
        class="services-list"
        style="margin-top: 0; padding-left: 20px"
        :class="{'no-height': !listActive}"
      >
        <li
          v-for="(service, k) in secondaryServices"
          :key="`service${k}`"
        >
          {{ service }}
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { mdiAccount } from '@mdi/js'

export default {
  components: {
  },

  data() {
    return {
      isHydrated: false,
      listActive: false,
      svgPath: mdiAccount
    }
  },

  computed: {
    mdAndUp() {
      return this.isHydrated ? this.$vuetify.breakpoint.mdAndUp : false
    },
    lgAndUp() {
      return this.isHydrated ? this.$vuetify.breakpoint.lgAndUp : false
    },
    smAndDown() {
      return this.isHydrated ? this.$vuetify.breakpoint.smAndDown : false
    },
    ...mapGetters({
      primaryServices: 'services/getPrimaryServices',
      secondaryServices: 'services/getSecondaryServices',
      moreServices: 'services/getMoreServices',
      threeColumnsServices: 'services/getThreeColumnsServices',
      getFromThreeColumnsByIndex: 'services/getFromThreeColumnsByIndex'
    })
  },

  mounted() {
    this.isHydrated = true
  },

  methods: {

    getFlexStyles(i) {
      return {
        'smooth': true,
        'pull-service-left-first': i === 1 && this.mdAndUp,
        'pull-service-left-second': i === 2 && this.mdAndUp,
        'pull-service-left-third': i === 3 && this.lgAndUp
      }
    },

    getLayoutClass() {
      return {
        'smooth': true,
        'mt-4': this.mdAndUp,
        'mt-0': this.smAndDown,
        'ml-0': true
      }
    },

    activeMobile(e) {
      this.listActive = !this.listActive
    }
  }
}
</script>
