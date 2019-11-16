import Vue from 'vue'
import App from './App.vue'
import './main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as faStarSolid, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStarRegular, faStarSolid, faChevronDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
