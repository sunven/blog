- vue props

```js
function assertProp(type, value) {
  // ...
}
assertProp(String, 'a')
assertProp(String, new String('a'))
assertProp(Array, [1, 2, 3])
assertProp(Object, { name: '1' })
function Person() {}
assertProp(Person, new Person())
```

- if(a==1)

```js
// ...
if (a == 1 && a == 2 && a == 3) {
  // go here
}
```

- vue 重写push
- 根据类图  写 类
