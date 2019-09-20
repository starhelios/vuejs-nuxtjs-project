/**
 * Created by nikita on 13/07/2019.
 */
const axios = require('axios')

const MAILCHIMP_URL = process.env.MAILCHIMP_URL
const MAILCHIMP_DEFAULT_LIST = process.env.MAILCHIMP_DEFAULT_LIST

function isAvailable(subscriptions) {
  return subscriptions.indexOf('newsletter') > -1
}

async function subscribe(data) {
  try {
    const response = await axios({
      url: `${MAILCHIMP_URL}/lists/${MAILCHIMP_DEFAULT_LIST}/members/`,
      method: 'post',
      data: {
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: data.firstName,
          LNAME: data.lastName,
          PHONE: data.phone,
          MMERGE3: data.message
        }
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`
      }
    })
    return response.data
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

module.exports = {
  subscribe,
  isAvailable
}
