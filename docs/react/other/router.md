# react-router-dom v5

## 优先级

children > component > render
<https://v5.reactrouter.com/web/api/Route/component>

## children

- 无论是否匹配都会被调用

## component

- 仅在匹配时渲染，使用路由属性进行渲染。
- 使用React.createElement从给定的组件创建一个新的React元素
- 每次渲染都会创建一个新组件。这将导致现有组件卸载并安装新组件

## render

- 匹配时调用
- 渲染组件前后做一些事情，例如权限

<https://github.com/remix-run/react-router/blob/v5.3.4/packages/react-router/modules/Route.js#L30>

```jsx
function Route(props) {
  let { children, component, render } = this.props
  return (
    <RouterContext.Provider value={props}>
      {props.match
        ? children
          ? typeof children === 'function'
            ? children(props)
            : children
          : component
          ? React.createElement(component, props)
          : render
          ? render(props)
          : null
        : typeof children === 'function'
        ? children(props)
        : null}
    </RouterContext.Provider>
  )
}
```
