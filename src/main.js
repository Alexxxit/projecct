import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import OfflinePlugin from 'offline-plugin/runtime'
OfflinePlugin.install()
var _ = require('lodash');


new Vue({
  el: '#app',
  render: h => h(App)
})
