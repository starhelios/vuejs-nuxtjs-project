<template>
  <section class="articles-list">
    <v-layout column
      				wrap
      				class="other-article-wrapper">
      <v-flex v-for="(article, i) in articles"
        			:key="`article${i}`"
							mb-3>
        <article>
          <nuxt-link :to="`/article/${article.slug}`">
            <v-layout row wrap>
              <v-flex xs12 sm5 md4 class="image-container">
                <img :src="$img(article.image)"
                  	 :alt="article.title">
              </v-flex>

              <v-flex xs12 sm6 md7 offset-sm1>
                <h1 class="article-title mb-2">{{ article.title }}</h1>
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
		/*
    this.$nextTick(function () {
      this.setArticlesHeader()
      window.addEventListener('resize', this.setArticlesHeader)
		})
		*/
  },

  methods: {
		/*
    setArticlesHeader() {
      this.$refs.articleHeaders.map(function (el, index) {
        this.removeArticleHeight(index)
      }.bind(this))
      this.articleHeaderHeight = this.calculateArticleHeight()
      this.$refs.articleHeaders.map(function (el, index) {
        this.setArticleHeight(index, this.articleHeaderHeight)
      }.bind(this))
		},
		*/

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

<style lang="scss">
.articles-list {
	a {
		color: black;
		font-style: normal;
		text-decoration: none;

		.image-container img {
			@media screen and (max-width: 600px) {
				width: 100%;
			}
			@media screen and (min-width: 600px) {
				width: 200px;
			}
		}

		.article-title {
			font-family: serif !important;
			font-size: 16px;
			font-weight: bold;
		}

		.article-description {
			font-family: serif !important;
			font-size: 14px;
		}
	}
}
</style>
