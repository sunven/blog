# d

## [vite] Internal server error: URI malformed

删除 <%= BASE_URL %>

## Cannot use import statement outside a module

type="module"

## 导入没有.vue 后缀

extensions: ['.vue'],

## Failed to resolve entry for package "async-validator". The package may have

alias: [
      { find: '@', replacement: '/src/' },
      { find: 'async-validator', replacement: 'node_modules/async-validator/lib/index.js' },
    ],

## jsx

plugins: [
    createVuePlugin({ jsx: true }),
  ]

  lang="jsx"

## The requested module '/node_modules/.vite/deps/core-js_modules_es__function__name__js.js?v=ea160175' does not provide an export named 'default'

optimizeDeps: {
    include: ['core-js', '@/util/phone_id_util'],
  },

## process is not defined

process.env.VUE_APP_RELEASE
import.meta.env.VITE_APP_RELEASE

## require is not defined

改 import

## ~@

改 @

## vite Cannot access 'SampleSynergy' before initialization

'sample-synergy':SampleSynergy  改为 SampleSynergy

## 静态资源引入

```
require 改为
new URL('@/assets/img/caseSurvey/waitQs.svg', import.meta.url).href,
```
