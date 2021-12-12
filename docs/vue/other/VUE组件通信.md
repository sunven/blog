# VUE组件通信

## 一、props

常用于父子组件通信


### 数据响应


- 子组件会自动响应父组件对props的修改
- 子组件不能直接修改父组件传递过来的props，因为这个修改，容易被父组件的修改覆盖
- 子组件修改父组件传递的props，通过**$emit**
- sync用法



子组件修改父组件传递的props，通过**$emit**
```javascript
this.$emit("change-title", "1");
//如果用了sync,则派发undate:title事件
//this.$emit("update:title", "1");
```
父组件接收子组件发出的事件
```javascript
<component-a :title="title" @change-title="changeTitle($event)"></component-a>
//如果用了sync，则会自动绑定一个update:title事件，用于修改title
//如果再重复定义update:title事件，则会合并这两个事件
//<component-a :title.sysnc="title"></component-a>
```
### example
```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
      div {
        margin: 5px;
        padding: 5px;
      }
      .div1 {
        width: 410px;
        height: 600px;
        border: 1px solid red;
      }
      .div1-1 {
        width: 400;
        height: 100px;
        border: 1px solid blue;
      }
    </style>
  </head>

  <body>
    <div id="app" class="div1">
      <pre>
        {{dataFormar}}
      </pre>
      <button @click="title+=1">parent change title</button>
      <component-a
        :title="title"
        :title-sync.sync="titleSync"
        @change-title="changeTitle($event)"
      ></component-a>
    </div>
  </body>
  <script>
    var ComponentA = {
      props: ["title", "titleSync"],
      template: `<div class="div1-1">
                    <p>{{title}}</p>
                    <p>{{titleSync}}</p>
                    <button @click="click">child change title</button>
                    <button @click="clickSync">child change title sync</button>
                </div>`,
      methods: {
        click() {
          this.$emit("change-title", "1");
        },
        clickSync() {
          this.$emit("update:titleSync", this.titleSync + "2");
        },
      },
    };
    var app = new Vue({
      el: "#app",
      components: { "component-a": ComponentA },
      data: {
        title: "title",
        titleSync: "titleSync",
      },
      methods: {
        changeTitle($event) {
          this.title += $event;
        },
      },
      computed: {
        dataFormar() {
          return JSON.stringify(this._data, null, "\t");
        },
      },
    });
  </script>
</html>
```
## 二、$bus
常用于任意组件间的通信

通过Vue实例实现事件总线：
```javascript
Vue.prototype.$bus=new Vue();
```
子组件派发事件：
```javascript
this.$bus.$emit("change-title",1);
```
父组件接收事件：
```javascript
this.$bus.$on("change-title",this.changeTitle);
```
### example
```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
      div {
        margin: 5px;
        padding: 5px;
      }
      .div1 {
        width: 410px;
        height: 600px;
        border: 1px solid red;
      }
      .div1-1 {
        width: 400;
        height: 100px;
        border: 1px solid blue;
      }
    </style>
  </head>

  <body>
    <div id="app" class="div1">
      <pre>
        {{dataFormar}}
      </pre>
      <button @click="title+=1">parent change title</button>
      <component-a :title="title"></component-a>
    </div>
  </body>
  <script>
    Vue.prototype.$bus = new Vue();
    //子组件
    var ComponentA = {
      props: ["title"],
      template: `<div class="div1-1">
                    <p>{{title}}</p>
                    <button @click="click">child change title</button>
                </div>`,
      methods: {
        click() {
          this.$bus.$emit("change-title", 1);
        },
      },
    };
    var app = new Vue({
      el: "#app",
      components: { "component-a": ComponentA },
      data: {
        title: "title",
      },
      mounted() {
        this.$bus.$on("change-title", this.changeTitle);
      },
      methods: {
        changeTitle($event) {
          this.title += $event;
        },
      },
      computed: {
        dataFormar() {
          return JSON.stringify(this._data, null, "\t");
        },
      },
    });
  </script>
</html>
```


### 实现事件总线
```javascript
class Bus {
  constructor() {
    this.callbacks = {};
  }
  //定义监听事件的方法
  $on(name, fn) {
    //将监听回调记录在callbacks中
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  //定义派发事件的方法
  $emit(name, args) {
    //派发事件时，依次执行监听了该事件的回调
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => cb(args));
    }
  }
}
```
## 三、$parent/$root/$childred


兄弟组件之间通信可通过共同父组件搭桥
```javascript
// child1
this.$parent.$on('foo', handle)
// child2
this.$parent.$emit('foo')
```
⽗组件可以通过$children访问⼦组件
```javascript
this.$children[0].xx = 'xxx'
```
## 四、$attrs/$listeners
### $attrs
包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用

- this.$.attrs可以获取到不是使用v-bind传递进来的属性
- 通过v-bind="$attrs"可以将传给父组件的属性，再传递给子组件
### $listeners
包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用

## 五、refs
获取子组件引用
```javascript
<input ref="input">
  
 //this.$refs.input
```


## 六、provide/inject


祖先和后代间的传值


### example
```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
      div {
        margin: 5px;
        padding: 5px;
      }
      .div1 {
        width: 410px;
        height: 600px;
        border: 1px solid red;
      }
      .div1-1 {
        width: 400;
        height: 120px;
        border: 1px solid blue;
      }
    </style>
  </head>

  <body>
    <div id="app" class="div1">
      <pre>
        {{dataFormar}}
      </pre>
      <button @click="title+=1">parent change title</button>
      <component-a :title="title" v-bind="$attrs" a="1"></component-a>
    </div>
  </body>
  <script>
    Vue.prototype.$bus = new Vue();
    //子组件

    var ComponentB = {
      inject: ["title"],
      template: `<p>{{$attrs}},{{title}}</p>`,
    };
    var ComponentA = {
      components: { "component-b": ComponentB },
      props: ["title"],
      template: `<div class="div1-1">
                    <p>{{title}}</p>
                    <button @click="click">child change title</button>
                    <component-b v-bind="$attrs"></component-b>
                </div>`,
      methods: {
        click() {
          this.$bus.$emit("change-title", 1);
        },
      },
    };
    var app = new Vue({
      el: "#app",
      components: { "component-a": ComponentA },
      provide: {
        title: "title provide",
      },
      data: {
        title: "title"
      },
      mounted() {
        this.$bus.$on("change-title", this.changeTitle);
      },
      methods: {
        changeTitle($event) {
          this.title += $event;
        },
      },
      computed: {
        dataFormar() {
          return JSON.stringify(this._data, null, "\t");
        },
      },
    });
  </script>
</html>
```
## 七、vuex
