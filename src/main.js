import Vue from 'vue'
import App from './App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as faStarSolid, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify';

library.add(faStarRegular, faStarSolid, faCaretDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
