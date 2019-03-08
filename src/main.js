import 'bootstrap/dist/css/bootstrap.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import 'nprogress/nprogress.css'
import './assets/css/style.default.css'
import './assets/css/custom.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import commonComponents from './components/common';
import VueSelect from 'vue-cool-select'

Vue.use(VueSelect, {
  theme: 'bootstrap'
})

commonComponents.forEach(component => {
    Vue.component(component.name, component);
});

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
