/**
 * Created by nikita on 13/07/2019.
 */
const axios = require('axios')

async function subscribe(data) {
  try {
    const response = await axios({
      url: `${process.env.COPPER_URL}/leads`,
      method: 'post',
      headers: {
        'X-PW-AccessToken': process.env.COPPER_API_KEY,
        'X-PW-Application': 'developer_api',
        'X-PW-UserEmail': process.env.COPPER_CREATOR_EMAIL,
        'Content-Type': 'application/json'
      },
      data: data
    })
    return response.data
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

function isNewBusiness(subscriptions) {
  return subscriptions.indexOf('rfp') > -1
}

function isRecruiting(subscriptions) {
  return subscriptions.indexOf('employment') > -1
}

module.exports = {
  subscribe: subscribe,
  isNewBusiness: isNewBusiness,
  isRecruiting: isRecruiting
}
