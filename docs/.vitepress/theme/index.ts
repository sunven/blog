import Jsfiddle from './components/Jsfiddle.vue'
import Layout from './layouts/Layout.vue'
import { h, App } from 'vue'
import { VPImage } from 'vitepress/theme'

export default {
  Layout: () => {
    return h(Layout)
  },
  enhanceApp({ app }: { app: App }) {
    app.component('Jsfiddle', Jsfiddle)
    app.component('Image', VPImage)
  },
}
