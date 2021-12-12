# React 高阶组件

## Props Proxy

### 操作 props

```javascript
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      const newProps = {
        user: currentLoggedInUser,
      }
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}
```

可以读取、添加、编辑、删除传给 WrappedComponent 的 props

### 通过 Refs 访问到组件实例

```javascript
function refsHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.method()
    }

    render() {
      const props = Object.assign({}, this.props, { ref: this.proc.bind(this) })
      return <WrappedComponent {...props} />
    }
  }
}
```

读取/添加实例的 props ，调用实例的方法

### 抽象 state

```javascript
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '',
      }

      this.onNameChange = this.onNameChange.bind(this)
    }
    onNameChange(event) {
      this.setState({
        name: event.target.value,
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange,
        },
      }
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}
```

使用：

```javascript
@ppHOC
class Example extends React.Component {
  render() {
    return <input name="name" {...this.props.name} />
  }
}
```

提取 value 属性 和 onChange 方法到高阶组件，类似 smart component 与 dumb component。
此时，input 变为一个受控组件

### 用其他元素包裹 WrappedComponent

```javascript
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      return (
        <div style={{ display: 'block' }}>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
```

## Inheritance Inversion

简单实现：

```javascript
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}
```

返回的 HOC 类（Enhancer）继承了 WrappedComponent。WrappedComponent 被 Enhancer 继承了，而不是 WrappedComponent 继承了 Enhancer。
HOC 通过 this 访问到 WrappedComponent，意味着它可以访问到 state、props、组件生命周期方法和 render 方法

### 渲染劫持

#### 条件渲染

```javascript
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      if (this.props.loggedIn) {
        return super.render()
      } else {
        return null
      }
    }
  }
}
```

#### 改变 render 的输出结果

```javascript
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      const elementsTree = super.render()
      let newProps = {}
      if (elementsTree && elementsTree.type === 'input') {
        newProps = { value: 'may the force be with you' }
      }
      const props = Object.assign({}, elementsTree.props, newProps)
      const newElementsTree = React.cloneElement(
        elementsTree,
        props,
        elementsTree.props.children
      )
      return newElementsTree
    }
  }
}
```

input 组件的 value 被改为‘may the force be with you’

> 你不能编辑或添加 WrappedComponent 实例的 props，因为 React 组件不能编辑它接收到的 props，但你可以修改由 render 方法返回的组件的 props

### 操作 state

```javascript
export function IIHOCDEBUGGER(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      return (
        <div>
          <h2>HOC Debugger Component</h2>
          <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>State</p>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          {super.render()}
        </div>
      )
    }
  }
}
```

访问 WrappedComponent 的 props 和 state 来做调试

### 命名

用 HOC 包裹了一个组件会使它失去原本 WrappedComponent 的名字

```javascript
HOC.displayName = `HOC(${getDisplayName(WrappedComponent)})`

//或

class HOC extends ... {
  static displayName = `HOC(${getDisplayName(WrappedComponent)})`
  ...
}
```

getDisplayName 实现：

```javascript
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName ||
         WrappedComponent.name ||
         ‘Component’
}
```
