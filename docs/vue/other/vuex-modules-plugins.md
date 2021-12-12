# Vuex中modules和plugins

## modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割



定义一个module

```javascript
export default {
  namespaced: true,
  state: {
    areaData: [],
  },
  mutations: {
    addArea(state, area) {
      state.areaData.push(area);
    },
    initArea(state, initData) {
      state.areaData = initData;
    },
  },
  actions: {
    reset({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("initArea", [
            { text: "北京市", code: "01" },
            { text: "上海市", code: "02" },
          ]);
          resolve();
        }, 1000);
      });
    },
  },
};
```

挂载

```javascript
import Vue from "vue";
import Vuex from "vuex";

import area from './area'
import persist from './plugins/persist'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[persist],
  modules: {area:area},
});
```

使用时明确命名空间

```javascript
<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <P>{{$store.state.area.areaData}}</P>
    <button @click="addArea">add area</button>
    <button @click="reset">reset</button>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    addArea() {
      this.$store.commit("area/addArea", { text: "武汉", code: "07" });
    },
    reset(){
      this.$store.dispatch("area/reset");
    }
  }
};
</script>
```



## plugins

Vuex 的 store 接受 `plugins` 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数



定义

```javascript
export default (store) => {
  // 初始化时从localStorage获取数据
  if (localStorage) {
    const areaData = JSON.parse(localStorage.getItem("areaData"));
    if (areaData) {
      store.commit("area/initArea", areaData);
    }
  }
  // 订阅mutation变化
  store.subscribe((mutation, state) => {
    if (mutation.type === "area/initArea") {
      localStorage.setItem("areaData", JSON.stringify(state.area.areaData));
    }
  });
};
```

使用时，配置到plugins选项中