# shallow copy and deep copy

- 深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的
- 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。

- 深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象
- 赋值赋的其实是该对象的在栈中的地址，而不是堆中的数据



![img](https://cdn.nlark.com/yuque/0/2019/png/85676/1553511001925-40688774-fce1-4e1c-8355-c49fab35e011.png)



## 浅拷贝的实现

#### Object.assign()



```javascript
var obj = { a: {a: "kobe", b: 39} };
var initalObj = Object.assign({}, obj);
initalObj.a.a = "wade";
console.log(obj.a.a); //wade
```



**当object只有一层的时候，是深拷贝**



```javascript
let arr = [1, 3, {
    username: 'kobe'
}];
let arr2=arr.concat();    
arr2[2].username = 'wade';
console.log(arr);
```



#### Array.prototype.concat()



```javascript
let arr = [1, 3, {
    username: 'kobe'
}];
let arr2=arr.concat();    
arr2[2].username = 'wade';
console.log(arr);
```



#### Array.prototype.slice()



```javascript
let arr = [1, 3, {
    username: ' kobe'
}];
let arr3 = arr.slice();
arr3[2].username = 'wade'
console.log(arr);
```



## 深拷贝的实现

#### JSON.parse(JSON.stringify())



```javascript
let arr = [1, 3, {
    username: ' kobe'
}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)
```



- 会忽略 undefined
- 会忽略 symbol

- 不能序列化函数
- 不能解决循环引用的对象



#### 递归



```javascript
//定义检测数据类型的功能函数
function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
//实现深度克隆---对象/数组
function clone(target) {
  //判断拷贝的数据类型
  //初始化变量result 成为最终克隆的数据
  let result,
    targetType = checkedType(target);
  if (targetType === "Object") {
    result = {};
  } else if (targetType === "Array") {
    result = [];
  } else {
    return target;
  }
  //遍历目标数据
  for (let i in target) {
    //获取遍历数据结构的每一项值。
    let value = target[i];
    //判断目标结构里的每一值是否存在对象/数组
    if (checkedType(value) === "Object" || checkedType(value) === "Array") {
      //对象/数组里嵌套了对象/数组
      //继续遍历获取到value值
      result[i] = clone(value);
    } else {
      //获取到value值是基本的数据类型或者是函数。
      result[i] = value;
    }
  }
  return result;
}
```



#### lodash



```javascript
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
// false
```





参考：

https://juejin.im/post/5b5dcf8351882519790c9a2e