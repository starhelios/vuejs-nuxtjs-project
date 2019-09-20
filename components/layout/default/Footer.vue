<template>
  <footer>
    <v-content class="footer">
      <v-container px-4>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm12
            md12
            lg12
            xl12
            offset-xs0
            offset-sm0
            offset-md0
            offset-lg0
            offset-xl0
            mt-5
            mb-5
          >
            <v-divider />
          </v-flex>
          <v-flex
            xs10
            sm10
            md10
            lg10
            xl10
            offset-xs1
            offset-sm1
            offset-md0
            offset-lg0
            offset-xl0
          >
            <div class="h3 follow-us">
              {{ heading }}
            </div>
          </v-flex>
          <v-flex
            xs11
            sm11
            md6
            offset-sm1
            offset-md0
            mt-4
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
                  offset-xs1
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
          <v-flex
            class="footer-text text-xs-center"
            xs12
            sm12
            md6
            mt-4
            mb-4
            text-xs-center
            text-sm-center
            text-md-right
          >
            {{ copyright }}
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </footer>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      heading: 'footer/getHeading',
      copyright: 'footer/getCopyright',
      links: 'footer/getLinks'
    })
  }
}
</script>
