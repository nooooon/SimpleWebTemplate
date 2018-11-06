/* index.js */
'use strict'

import Vue from 'vue';
import App from '../components/app.vue';

new Vue({
  el: '#app',
  components: {
    'component': App,
  },
  template: `
    <div>
      <component></component>
    </div>
  `
})
