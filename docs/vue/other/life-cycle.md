# 生命周期

## 一、父子组件

- Com-1:父组件,Com-1-1:子组件
- 即:组件Com-1中用了组件Com-1-1

### 首次挂载

```js
Com-1 beforeCreate
Com-1 created
Com-1 beforeMount
Com-1-1 beforeCreate
Com-1-1 created
Com-1-1 beforeMount
Com-1-1 mounted
Com-1 mounted
```

### 子组件更新

```js
Com-1-1 beforeUpdate
Com-1-1 updated
```

### 子组件自己this.$destroy()

或者在父组件中，通过子组件的ref来$destroy()

```js
Com-1-1 beforeDestroy
Com-1-1 destroyed
```

- 子组件dom不会被销毁
- 父组件不会update

### 父组件自己this.$destroy()

```js
Com-1 beforeDestroy
Com-1-1 beforeDestroy
Com-1-1 destroyed
Com-1 destroyed
```

- 父组件、子组件的dom都不会被销毁

### 父组件销毁子组件

子组件上的v-if改为false

```js
Com-1 beforeUpdate
Com-1-1 beforeDestroy
Com-1-1 destroyed
Com-1 updated
```

- 子组件的dom会被销毁
- 父组件触发update

### 父组件被销毁了

父组件上的v-if改为false

```js
Com-1 beforeDestroy
Com-1-1 beforeDestroy
Com-1-1 destroyed
Com-1 destroyed
```

- 父组件、子组件的dom都会被销毁

### 父组件中改了传给子组件的prop

或者子组件自己$emit这个prop

```js
Com-1 beforeUpdate
Com-1-1 beforeUpdate
Com-1-1 updated
Com-1 updated
```

## 二、单个组件

![img](https://cn.vuejs.org/images/lifecycle.png)
