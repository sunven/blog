# redux reselect

<https://www.reduxjs.cn/recipes/computing-derived-data>

redux 在每一次 dispatch 之后都会让注册的回调都执行一遍，connect 实际上就是一个高阶组件

这里可以发现 connect 函数返回的这个高阶组件帮我们在 redux 的 store 里面注册了一个函数，而这个函数的作用就是获取新的 state 和 props，然后触发一次 setState，这就必然会导致这个高阶组件的重新 render，如果子组件不是继承自 PureComponent 或做过其他处理，那么子组件也必然会重新 render，即使可能该组件涉及到的 state 和 props 都没有发生变化，这样一来就产生了性能问题，其实这个问题还好解决，通过继承 PureComponent 或者自己在 shouldCOmponentUpdate 里面做判断即可解决。但是另一个不可避免的性能问题在于 mapStateToProps 函数的执行，如果前端管理的数据十分复杂，每次 dispatch 以后所有用到 store 的组件都要计算 mapStateToProps 自然就会浪费性能，解决这个问题的方法改造 mapStateToProps 的入参函数，在入参函数里面缓存一个旧值，然后每次执行 mapStateToProps 的时候就利用新值和旧值缓存的一个浅比较来判断是否返回原值，如果浅比较相同就直接返回原值，这样就不用再做计算，节省了性能。这样对于性能的提高往往是很大的，因为一次 dispatch 一般只改变很少的内容
