<template>
  <div id="mojave">
    <default-header class="mojave-background" />

    <v-container
      class="Container"
      px-4
    >
      <div>
        <h1
          class="Title"
          v-text="article.title"
        />
      </div>

      <div>
        <img
          class="Cover of-c"
          :src="$img(article.image)"
          :alt="article.title"
        >
      </div>

      <div class="Content">
        <v-layout
          :column="$vuetify.breakpoint.smAndDown || true"
        >
          <v-flex
            xs4
            md3
          >
            <div class="Author">
              <span
                class="Author-name"
                v-text="article.authorName"
              />
              <i
                class="Author-role"
                v-text="article.authorJobTitle"
              />
            </div>
            <time
              class="Date"
              v-text="article.date"
            />
          </v-flex>
          <v-flex
            xs8
            md9
            :mt-4="$vuetify.breakpoint.smAndDown || true"
          >
            <!-- eslint-disable vue/no-v-html -->
            <p
              class="Description"
              v-html="article.description"
            />
          </v-flex>
        </v-layout>
      </div>
    </v-container>

    <contact-form />

    <default-footer />
  </div>
</template>

<script>
import { getArticle } from '~/app/contentful/fetcher'

import DefaultHeader from '~/components/layout/default/Header.vue'
import ContactForm from '~/components/layout/default/ContactForm.vue'
import DefaultFooter from '~/components/layout/default/Footer.vue'

export default {
  layout: 'articleDetail',

  components: {
    DefaultHeader,
    ContactForm,
    DefaultFooter
  },

  head() {
    return {
      title: this.article.titleTag,
      meta: [
        { name: 'og:title', hid: 'og:title', content: this.article.title },
        { name: 'og:site_name', hid: 'og:site_name', content: 'Mojave' },
        { name: 'og:description', hid: 'og:description', content: this.article.homePageCaption },
        { name: 'og:image', hid: 'og:image', content: this.article.image }
      ]
    }
  },

  data: () => ({
    headTitle: ''
  }),

  async asyncData({ route }) {
    const article = await getArticle(route.params.id)
    article.image = article.image.concat('?w=600')
    return {
      article,
      breadcrumbsItems: [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: article.title,
          disabled: true
        }
      ]
    }
  }

}
</script>

<style lang="stylus" scoped>
.Container
    max-width 800px !important

.Title
    margin-top 20px
    max-width 840px
    line-height normal
    color #313131
    font-size 32px
    @media screen and (min-width: 600px)
        font-size 56px

.Cover
    width 100%
    height 100%
    margin-top 20px
    @media screen and (min-width: 600px)
        max-width 600px
        margin-top 50px

.Content
    margin-top 20px
    @media screen and (min-width: 600px)
        margin-top 48px

.Author
    &-name, &-role
        display block
        color #313131
        font-size 14px
        font-weight 600

.Date
    display block
    margin-top 14px
    font-size 12px
    color rgba(0, 0, 0, .5)

.Description
    color #313131
    line-height 26px
</style>

<!-- non-scoped style -->
<style lang="stylus">
.Breadcrumbs li.v-breadcrumbs__divider
    color #313131
    opacity .5
    padding 0 4px
.Description
    *
        line-height inherit
    p
        font-family Georgia !important
        font-size 18px
    h1
        margin-top 56px
        margin-bottom 32px
        font-size 30px
        @media screen and (min-width: 600px)
            font-size 24px
    a
        color #edb248
        text-decoration none !important
</style>
