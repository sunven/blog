# 组件：有状态(stateful) vs 无状态(stateless)

## 状态

状态是指我们可能会更改的数据（通常是向用户显示），它可能会更改。比如数据库的数据已更新；用户行为修改了数据。
## 有状态

- 没有实例变量的对象，不能保存数据
- 组件的行为取决于组件的状态，则可以将其称为有状态组件



react示例：
```javascript
class Main extends Component {
 constructor() {
   super()
   this.state = {
     books: []
   }
 }
 render() {
   <BooksList books={this.state.books} />
 }
}
```
## 无状态

- 有实例变量的对象，可以保存数据
- 组件的行为与其状态无关，则可以是无状态组件
- 函数组件、功能组件
- 纯函数



react示例：
```javascript
const BooksList = ({books}) => {
 return (
   <ul>
     {books.map(book => {
       return <li>book</li>
     })}
   </ul>
 )
}
```
## 什么时候用哪种组件？
举个例子：

1. 现在的包子铺需要自己买面粉，自己做包子。我们去买，只给了钱，说要买个包子。我们无法确定老板用了什么面粉，也只能从已有的馅儿中挑一个。这个包子铺就好比有状态组件。
1. 我们去盒马鲜生，想要吃一只帝王蟹，我们自己挑一只买好，送给厨房，厨房只负责做。不管我们吃多大的，还是想吃虾，厨房不用管。只负责做，我们负责提供材料。这个厨房就好比无状态组件。



例如下图，qq.com的一个板块儿。教育和历史是两个相同结构的块儿，我们想要封装一个NewsList的组件，那么我们只需要传给NewsList要展示的数据，NewsList负责帮我们渲染出结果就好了，那么凡是遇到相同的模块，这个组件都适用。这就适合用无状态组件。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/85676/1590539283832-5f37fce7-f5c8-42ea-b2ef-a8859acafbc5.png)
