
# 习题

## 1、完成assertProp方法，准确的判断出value的类型是type

```js
function assertProp(type, value) {
  // ...
}
// 以下用例应该返回 true
assertProp(String, 'a')
assertProp(String, new String('a'))
assertProp(Array, [1, 2, 3])
assertProp(Object, { name: '1' })
function Person() {}
assertProp(Person, new Person())
```

## 2、补充代码，使得进入if (a == 1 && a == 2 && a == 3)

```js
// ...
// if 前补充代码
// ...
if (a == 1 && a == 2 && a == 3) {
  // go here
}
```

## 3、实现一个判断零值相等的方法，即：满足同值相等，且+0 和-0 是相等的

## 4、箭头函数与普通函数有什么区别？写一个例子来体现将普通函数替换成箭头函数后调用得到的结果不同

## 5、举例你在使用call(apply),bind的场景
