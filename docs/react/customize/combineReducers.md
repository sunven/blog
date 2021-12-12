# Redux combineReducers

```javascript
export default function combineReducers(reducers) {
  //state 当前state
  //action reducer的action
  return function combination(state = {}, action) {
    debugger;
    //执行完reduce后的state
    let nextState = {};
    //较之前的state 是否有变化
    let hasChange = false;

    //遍历所有reducer,得到state
    for (let key in reducers) {
      const reducer = reducers[key];
      //执行每个reducer，将得到的state 放进nextState
      nextState[key] = reducer(state[key], action);
      // 新的state与原来的不一样，hasChange则为true
      // 只要有一个state不一样了，则hasChange为true
      hasChange = hasChange || nextState[key] !== state[key];
    }

    //hasChange如果为false,即没有action命中的情况
    //比如：使用dispatch时，没有匹配到action,那么得到nextState与原来的state就没有变化
    //如果reducer个数发生了变化，也需要返回新的state
    //hasChange为true,则返回新的state,否则还是用之前的state
    hasChange =
      hasChange || Object.keys(reducers).length !== Object.keys(state).length;
    return hasChange ? nextState : state;
  };
}
```