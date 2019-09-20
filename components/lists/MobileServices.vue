<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card
    class="smooth"
    style="margin-top: -3px"
    :class="{'orange-dot': true, 'ml-3': gt768}"
  >
    <v-list>
      <v-list-group v-model="listActive">
        <template v-slot:activator>
          <v-list-tile class="shrink">
            <v-list-tile-content class="mobile-tile-list">
              <v-list-tile-title>{{ heading }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="item in secondaryServices"
          :key="item"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
import { replaceComma } from '../../app/array'

export default {
  data() {
    return {
      isHydrated: false

    }
  },

  computed: {
    gt768() {
      return this.isHydrated ? this.$vuetify.breakpoint.width > 768 : false
    },
    services() {
      return this.isHydrated ? this.getServicesData() : false
    },
    heading() {
      return this.isHydrated ? this.services.secondaryHeading : ''
    },
    secondaryServices() {
      return this.isHydrated && this.services
        ? this.services.secondaryServices.map(service => replaceComma(service))
        : []
    }
  },

  mounted() {
    this.isHydrated = true
  },

  methods: {
    getServicesData() {
      return this.isHydrated && this.$store.state.contentful.rawItems.services.hasOwnProperty('0')
        ? this.$store.state.contentful.rawItems.services[0].fields
        : false
    }
  }
}
</script>
