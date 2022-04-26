# (0, function)(param)

逗号运算符

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator>

```javascript
const obj = {
	fun: function () {
		return this;
	},
};
console.log(1, obj.fun());
console.log(2, (0, obj.fun)());
```

`(0, obj.fun)()` 等价与  `fun = obj.fun; fun()`

this指向改变
