<template>
  <v-container
    fluid
    px-4
    class="services"
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        offset-xs0
        offset-sm0
        offset-md0
        offset-lg0
        offset-xl0
      >
        <span class="h1 services-header">{{ servicesHeading }}</span>
      </v-flex>
    </v-layout>
    <services />
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Services from '~/components/lists/Services.vue'

export default {

  components: {
    Services
  },

  computed: {
    ...mapGetters({ servicesHeading: 'services/getServicesHeading' })
  }

}
</script>
