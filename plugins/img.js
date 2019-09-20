import Vue from 'vue'
import { detect } from 'detect-browser'
import qs from 'qs'
import { get, flow } from 'lodash'
const browser = detect()

const getFileExtension = url =>
  url
    .split('.')
    .pop()

// docs: https://www.contentful.com/developers/docs/references/images-api/#/reference/changing-formats/image-format/retrieve-an-image/console
const getFileFm = url =>
  flow(
    url => url.split('?'),
    chunks => chunks[1],
    qs.parse,
    obj => get(obj, 'fm', '')
  )(url)

const changeFileExtension = (url, ext) =>
  flow(
    url => url.split('?'),
    chunks => chunks[1],
    qs.parse,
    obj => ({
      ...obj,
      fm: ext
    }),
    obj => qs.stringify(obj, {
      addQueryPrefix: true
    }),
    qs => url.split('?')[0].concat(qs)
  )(url)

const convertToWebP = (url) => {
  if (getFileExtension(url) !== 'webp' && getFileFm(url) !== 'webp') {
    return changeFileExtension(url, 'webp')
  } else {
    return url
  }
}

Vue.prototype.$img = (url) => {
  return convertToWebP(url)
}

const myPlugin = {}
myPlugin.install = (Vue, options) => {
  Vue.mixin({
    mounted() {
      Vue.prototype.$img = (url) => {
        if (browser.name === 'safari' || browser.os === 'iOS') {
          return url
        } else {
          return convertToWebP(url)
        }
      }
    }
  })
}

Vue.use(myPlugin)
