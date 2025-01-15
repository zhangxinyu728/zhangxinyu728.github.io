import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import "./router/permission"
import "./utils/eventbus"
import i18n from "./plugins/i18n"

Vue.config.productionTip = false

/**
 * 初始化
 */

if(localStorage.getItem("ego")){
  store.commit("loginModule/updateToken",JSON.parse(localStorage.getItem("ego")).token);
  store.commit("loginModule/updateUsername",JSON.parse(localStorage.getItem("ego")).username);
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
