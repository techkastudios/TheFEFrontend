import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMobile, faCalendarDay, faFire, faSun, faMoon, faChevronDown, faChevronUp, faPrint, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faFacebookMessenger, faInstagram, faLinkedin, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faMobile, faCalendarDay, faFire, faSun, faMoon, faChevronDown, faChevronUp, faPrint, faSearch, faPlus)

// brands
library.add(faFacebookF, faWhatsapp, faYoutube, faTwitter, faLinkedin, faWhatsapp, faFacebookMessenger, faInstagram)

// Register the component globally
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
