# with

將某个对象添加到作用域链的顶部，如果在statement中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值

减少变量的长度

**语法**

```javascript
with (expression) {
    statement
}
```

**例子：**

```javascript
var div1 = document.getElementById("example");
with (div1.style) {
  width = "200px";
  height = "200px";
  background = "red";
}
function f(a, b) {
  with (b) {
    console.log(a);
  }
}
//先在指定的对象中查找
f(1, { a: 2 }); //2

//
function f(a, b) {
  with (b) {
    console.log(a);
  }
}
f(1, 2); //1
```

**vue render函数使用了with**

```javascript
var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
  },
});
console.log(app.$options.render)
```

console.log输出如下：

```javascript
(function anonymous() {
  with (this) {
    return _c("div", { attrs: { id: "app" } }, [_v(_s(message))]);
  }
});
```

**利：**`with`语句可以在不造成性能损失的情況下，减少变量的长度。其造成的附加计算量很少。使用'with'可以减少不必要的指针路径解析运算。需要注意的是，很多情況下，也可以不使用with语句，而是使用一个临时变量来保存指针，来达到同样的效果。

**弊：**`with`语句使得程序在查找变量值时，都是先在指定的对象中查找。所以那些本来不是这个对象的属性的变量，查找起来将会很慢。如果是在对性能要求较高的场合，'with'下面的statement语句中的变量，只应该包含这个指定对象的属性



> 推荐的替代方案是声明一个临时变量来承载你所需要的属性