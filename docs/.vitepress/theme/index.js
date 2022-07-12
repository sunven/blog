import Jsfiddle from './components/Jsfiddle.vue'
import Layout from './layouts/Layout.vue'
import { h } from 'vue'

export default {
  Layout: () => {
    return h(Layout)
  },
  enhanceApp({ app }) {
    app.component('Jsfiddle', Jsfiddle)
  },
}
