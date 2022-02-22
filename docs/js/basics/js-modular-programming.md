# Javascript模块化编程

## 常规写法

```js
function m1() {
    //...
}
function m2() {
    //...
}
```

## 对象写法

```js
var module1 = new Object({
　　_count : 0,
　　m1 : function (){
　　　　//...
　　},
　　m2 : function (){
　　　　//...
　　}
});
```
