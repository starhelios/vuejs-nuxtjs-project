const contentful = require('contentful')
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

// export `createClient` to use it in page components
export const createClient = function () {
  return contentful.createClient(config)
}
