# vue-router 简单实现

## VueRouter

```javascript
import list from './list'
import view from './view'

// 引用传入Vue构造函数
let Vue

// VueRouter类: new VueRouter({routes: [...]})
class VueRouter {
  constructor(options) {
    // 保存选项备用
    this.$options = options

    // 创建current保存当前url
    // matched他应该是响应式的
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])
    this.match()

    // 监听hashchange时间
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {
    // 修改当前url, hash的格式#/xxx
    this.current = window.location.hash.slice(1)
    console.log(this.current)
    this.matched = []
    this.match()
  }

  // 匹配路由
  match(routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      // /about/info
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
      }
    }
  }
}

// 实现install方法
// 参数1：Vue构造函数，Vue.use(VueRouter)
VueRouter.install = function(_Vue) {
  Vue = _Vue

  // 1.挂载VueRouter实例
  // 为了能够拿到Vue根实例中的router实例
  // 可以利用全局混入
  Vue.mixin({
    beforeCreate() {
      // 上下文已经是组件实例了
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })

  // 2.注册两个组件router-view，router-link
  Vue.component('router-view', view)

  // <router-link to="/">xxx</router-link>
  Vue.component('router-link', list)
}

export default VueRouter
```

## router-view

```javascript
export default {
  render(h) {
    //标记当前router-view深度
    this.$vnode.data.routerView = true
    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) {
          //说明当前parent是router-view 深度++
          depth++
        }
      }
      parent = parent.$parent
    }

    let component = null
    const route = this.$router.matched[depth]
    if (route) {
      //debugger;
      console.log(route)

      component = route.component
    }

    if (component == null) {
      return
    }
    return h(component)
  },
}
```

## router-link

```javascript
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  render(h) {
    // 参数1tag类型
    // 参数2传入各种属性和事件
    return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    // 也可以使用jsx
    // return <a href={'#' + this.to}>{this.$slots.default}</a>
  },
}
```
