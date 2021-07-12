# 迭代器和生成器

## reference

[迭代器和生成器 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)

## Iterators

## Generators

- yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行(惰性求值)
- 可以执行多次（或者说多个）yield表达式,所以Generator 函数可以返回一系列的值

```js
function* idMaker() {
  console.log("step1");
  var index = 0;
  while (true && index < 20) {
    console.log("step2");
    yield index++;
    console.log("step3");
  }
}
var gen = idMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

结果

```
step1
step2
0
step3
step2
1
step3
step2
2
```

### next()的参数

当作上一个yield表达式的返回值

```js
function* fibonacci() {
  var fn1 = 0;
  var fn2 = 1;
  while (true) {
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;
    if (reset) {
      fn1 = 0;
      fn2 = 1;
    }
  }
}
var sequence = fibonacci();
console.log(sequence.next().value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
console.log(sequence.next().value); // 3
console.log(sequence.next().value); // 5
console.log(sequence.next().value); // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
```

## Iterators与Generator关系

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身

```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```

因此，可以把 Generator 赋值给对象的Symbol.iterator属性

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```