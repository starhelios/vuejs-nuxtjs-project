/**
 * Created by nikita on 27/06/2019.
 */
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
require('dotenv').config()
Vue.use(VueReCaptcha, { siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY })
