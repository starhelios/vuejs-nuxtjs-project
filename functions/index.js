require('dotenv').config()
const get = require('lodash/get')
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const express = require('express')
const app = express()
const mailchimp = require('./mailchimp')
const copper = require('./copper')

app.use(cors)
app.post('/subscribeEmail', async (req, res) => {
  const mailchimpResult = []
  const copperResult = []

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')

  // Grab the data parameters.
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const subscriptions = req.body.subscriptions

  try {
    if (mailchimp.isAvailable(subscriptions)) {
      // send to mailchimp
      const mailchimpResponse = await mailchimp.subscribe({
        email: req.body.email,
        firstName: firstName,
        lastName: lastName,
        phone: req.body.phone,
        message: req.body.message
      })
      mailchimpResult.push(mailchimpResponse)
    }
  } catch (error) {
    mailchimpResult.push(error.message)
  }

  try {
    let copperSend = false
    const copperData = {
      name: `${firstName} ${lastName}`,
      email: {
        email: req.body.email,
        category: 'work'
      },
      phone_numbers: [{
        number: `${req.body.phone}`,
        category: 'mobile'
      }],
      details: req.body.message,
      customer_source_id: 950257,
      tags: []
    }
    if (copper.isNewBusiness(subscriptions)) {
      copperData.tags.push('New Business')
      copperSend = true
    }
    if (copper.isRecruiting(subscriptions)) {
      copperData.tags.push('Recruiting')
      copperSend = true
    }
    if (req.body.message) {
      copperData.tags.push('webmessage')
    }
    if (copperSend) {
      const copperResponse = await copper.subscribe(copperData)
      copperResult.push(copperResponse)
    }
  } catch (error) {
    copperResult.push(error.message)
  }
  res.json({ mailchimp: mailchimpResult, copper: copperResult })
})

exports.app = functions.https.onRequest(app)
