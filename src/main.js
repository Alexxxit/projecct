import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import OfflinePlugin from 'offline-plugin/runtime'
OfflinePlugin.install()
//import /* webpackChunkName: 'Filename' */ '../filename'

new Vue({
  el: '#app',
  render: h => h(App)
})
