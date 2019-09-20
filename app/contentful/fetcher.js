import { get } from 'lodash'
import { format } from 'date-fns'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { ucFirst } from '../string'
import { replaceComma } from '../array'
import { splitArray } from '../contentful/services'

import { createClient } from '../../plugins/contentful.js'

const client = createClient()

export const getEntitiesList = () => {
  return [
    'article', 'homePage',
    'contactForm', 'footer',
    'mainNavigation', 'services'
  ]
}

export const getPromisesArray = (entitiesID) => {
  const promisesArray = []
  for (const entity of entitiesID) {
    promisesArray.push(client.getEntries({
      'content_type': entity,
      order: '-sys.createdAt'
    }))
  }
  return promisesArray
}

export const getAsyncDataObj = (entitiesID, result) => {
  const mappedObject = {}
  for (const i in entitiesID) {
    if (!entitiesID.hasOwnProperty(i)) continue
    const variableName = 'pull' + ucFirst(entitiesID[i])
    mappedObject[variableName] = result[i].items
  }
  return mappedObject
}

export const onPromisesResolve = (result) => {
  const entitiesID = getEntitiesList()
  return getAsyncDataObj(entitiesID, result)
}

export const getContentfulEntities = () => {
  return Promise.all(getPromisesArray(getEntitiesList()))
    .then(onPromisesResolve)
    .catch(console.error) // eslint-disable-line no-console
}

export const getMainNavigation = async () => {
  const entries = await client.getEntries({
    'content_type': 'mainNavigation'
  })
  const mainNavigation = get(entries, ['items', 0], {})
  return {
    menuLinks: get(mainNavigation, ['fields', 'menuLinks', 'menu-links'], [])
  }
}

export const getHero = async () => {
  const entries = await client.getEntries({
    'content_type': 'homePage'
  })
  const homePage = get(entries, ['items', 0], {})

  return {
    heading: get(homePage, ['fields', 'heading1']),
    description: get(homePage, ['fields', 'description1', 'content', 0, 'content', 0, 'value']),
    heading2: get(homePage, ['fields', 'heading2']),
    description2: get(homePage, ['fields', 'description2', 'content'])
  }
}

export const getServices = async () => {
  const entries = await client.getEntries({
    'content_type': 'services'
  })
  const services = get(entries, ['items', 0], {})
  const primaryServices = get(services, ['fields', 'primaryServices'], []).map(service => replaceComma(service))
  const secondaryServices = get(services, ['fields', 'secondaryServices'], []).map(service => replaceComma(service))
  let threeColumns = []
  threeColumns.push(primaryServices)
  threeColumns = threeColumns.concat(splitArray(secondaryServices))
  return {
    primaryServices: primaryServices,
    secondaryServices: secondaryServices,
    servicesHeading: get(services, ['fields', 'mainHeading'], ''),
    moreServices: get(services, ['fields', 'secondaryHeading'], ''),
    threeColumns: threeColumns
  }
}

export const getArticles = async () => {
  const entries = await client.getEntries({
    'content_type': 'article',
    order: '-sys.createdAt'
  })
  const articles = get(entries, ['items'], {})
  return articles.map(article => ({
    slug: get(article, ['fields', 'urlSlug'], ''),
    title: get(article, ['fields', 'title'], ''),
    image: get(article, ['fields', 'heroImage', 'fields', 'file', 'url'], ''),
    description: get(article, ['fields', 'homePageCaption', 'content', 0, 'content', 0, 'value'], '')
  }))
}

export const getArticle = async (urlSlug) => {
  const entries = await client.getEntries({
    'content_type': 'article',
    'fields.urlSlug': urlSlug
  })

  const dataModel = () => {
    const article = get(entries, ['items', 0], {})
    return {
      urlSlug: get(article, ['fields', 'urlSlug'], ''),
      title: get(article, ['fields', 'title'], ''),
      titleTag: get(article, ['fields', 'titleTag'], ''),
      image: get(article, ['fields', 'heroImage', 'fields', 'file', 'url'], ''),
      authorName: get(article, ['fields', 'author'], ''),
      authorJobTitle: get(article, ['fields', 'authorTitle'], ''),
      date: (date => format(date, 'MMM DD, YYYY'))(get(article, ['sys', 'createdAt'], '')),
      homePageCaption: get(article, ['fields', 'homePageCaption', 'content', 0, 'content', 0, 'value'], ''),
      description: (body => documentToHtmlString(body))(get(article, ['fields', 'body'], {}))
    }
  }

  switch (entries.items.length) {
    case 1:
      return dataModel()
    case 2:
      return Promise.reject(new Error('No items'))
    default:
      Promise.reject(new Error('Something went wrong'))
      break
  }
}

export const getContactForm = async (urlSlug) => {
  const entry = await client.getEntry('3WGJ0oN8B9yY1JDA9KcYNB')

  const dataModel = () => {
    const form = entry

    return {
      textFields: get(form, ['fields', 'contactTextFields', 'contact-text-fields'], [])
        .map(field => ({
          ...field,
          required: String(field.required) === 'true'
        })),
      choices: get(form, ['fields', 'contactChoices', 'contact-choices'], [])
        .map(field => ({
          ...field,
          required: String(field.required) === 'true'
        })),
      heading: get(form, ['fields', 'heading'], ''),
      choicesHeading: get(form, ['fields', 'contactChoicesHeading'], ''),
      disclaimer: (body => documentToHtmlString(body))(get(form, ['fields', 'contactDisclaimer'], [])),
      acceptDisclaimer: get(form, ['fields', 'acceptDisclaimer'], ''),
      sendButton: get(form, ['fields', 'sendButton'], ''),
      submitValidationError: get(form, ['fields', 'submitValidationError'], ''),
      serverSideError: get(form, ['fields', 'serverSideError'], ''),
      submitSuccess: get(form, ['fields', 'submitSuccess'], '')
    }
  }

  return dataModel()
}

export const getFooter = async () => {
  const entries = await client.getEntries({
    'content_type': 'footer'
  })
  const footer = get(entries, ['items', 0, 'fields'])
  return {
    heading: get(footer, ['heading'], ''),
    copyright: get(footer, ['copyright'], ''),
    links: get(footer, ['links', 'links'], '')
  }
}

export const getAssets = () =>
  client.getAssets()
