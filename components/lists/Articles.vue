<template>
  <section>
    <v-layout
      row
      wrap
      class="other-article-wrapper"
    >
      <v-flex
        v-for="(article, i) in articles"
        :key="`article${i}`"
        xs12
        sm6
        md4
        lg4
        xl4
        offset-xs0
        offset-sm0
        offset-md0
        offset-lg0
        offset-xl0
        class="other-article cur-p"
      >
        <article>
          <nuxt-link :to="`/article/${article.slug}`">
            <v-layout
              column
              class="smooth"
              :mr-3="smAndUp"
            >
              <v-flex
                align-left
                sm11
                md4
                class="article-header-wrapper"
              >
                <div
                  ref="articleHeaders"
                  class="h1 other-article-header"
                  :style="{'min-height': articleHeaderHeight+'px'}"
                >
                  {{ article.title }}
                </div>
              </v-flex>
              <v-flex
                sm4
                md11
              >
                <img
                  class="other-article-image flex shrink"
                  :src="$img(article.image)"
                  :alt="article.title"
                >
              </v-flex>
              <v-flex md12>
                <p class="article-description">
                  {{ article.description }}
                </p>
              </v-flex>
            </v-layout>
          </nuxt-link>
        </article>
      </v-flex>
    </v-layout>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isHydrated: false,
      articleHeaderHeight: 70
    }
  },

  computed: {
    smAndDown() {
      return this.getBreakpointSafe('smAndDown')
    },
    smAndUp() {
      return this.getBreakpointSafe('smAndUp')
    },
    mdAndUp() {
      return this.getBreakpointSafe('mdAndUp')
    },
    lgAndUp() {
      return this.getBreakpointSafe('lgAndUp')
    },
    ...mapGetters({ 'articles': 'article/getArticles' })
  },

  mounted() {
    this.isHydrated = true
    this.$nextTick(function () {
      this.setArticlesHeader()
      window.addEventListener('resize', this.setArticlesHeader)
    })
  },

  methods: {

    setArticlesHeader() {
      this.$refs.articleHeaders.map(function (el, index) {
        this.removeArticleHeight(index)
      }.bind(this))
      this.articleHeaderHeight = this.calculateArticleHeight()
      this.$refs.articleHeaders.map(function (el, index) {
        this.setArticleHeight(index, this.articleHeaderHeight)
      }.bind(this))
    },

    setArticleHeight(index, value) {
      this.$refs.articleHeaders[index].style['min-height'] = value + 'px'
    },

    removeArticleHeight(index) {
      this.$refs.articleHeaders[index].style['min-height'] = null
    },

    calculateArticleHeight() {
      const heights = []
      for (const element of this.$refs.articleHeaders) {
        heights.push(element.clientHeight)
      }
      return Math.max(...heights)
    },

    getBreakpointSafe(name) {
      return this.isHydrated ? this.getBreakpoint(name) : false
    },

    getBreakpoint(name) {
      return this.$vuetify.breakpoint[name]
    },

    handleArticleClick(article) {
      const path = `/article/${article.slug}`
      this.$router.push(path)
    }

  }
}
</script>

<style lang="stylus">
.other-article-wrapper
  a
    display block
  *
    color rgba(0,0,0,0.87)
    text-decoration none
</style>
