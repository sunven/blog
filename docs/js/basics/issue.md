# ISSUE

## 编写add函数 然后 add(1)(2)(3)(4) 输出10

### 重点

- valueOf
- toString

```js
function add() {
    var args = Array.prototype.slice.call(arguments);
    var fn = function () {
        var arg_fn = Array.prototype.slice.call(arguments);
        return add.apply(null, args.concat(arg_fn));
    }

    fn.valueOf = function () {
        return args.reduce(function (a, b) {
            return a + b;
        })
    }

    return fn;
}
console.log(add(1, 2, 3)(4,5)(6)(7))
```

### reference

[一道面试题引发的对 javascript 类型转换的思考](https://juejin.im/entry/58beb514128fe1006456df73)

## “连等赋值”问题

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
alert(a.x); // --> undefined
alert(b.x); // --> {n: 2}
```

### 重点

- 赋值表达式
- 右结合性

### reference

[由ES规范学JavaScript(二)：深入理解“连等赋值”问题](https://segmentfault.com/a/1190000004224719)

## jquery.validate v. 1.9 ignores some hidden inputs

```js
var validatorSettings = $.data($('form')[0], 'validator').settings;
validatorSettings.ignore = "";
```

### reference

[https://stackoverflow.com/questions/8565135/jquery-validate-v-1-9-ignores-some-hidden-inputs](https://stackoverflow.com/questions/8565135/jquery-validate-v-1-9-ignores-some-hidden-inputs)
