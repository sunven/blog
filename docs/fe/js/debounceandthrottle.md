# 函数防抖与函数节流

都是通过定时器控制函数的执行频率

## 函数防抖

```js
var debounce = function (method, delay) {
    var timer = null;
    return function () {
        var _this = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(_this, args);
        }, delay);
    };
};
```

应用场景：自动完成

## 函数节流

```js
function throttle(method, delay, mustRunDelay) {
    var timer = null, args = arguments;
    var start = 0, now = 0;
    return function () {
        var context = this;
        now= Date.now();
        if(!start){
            start = now;
        }
        if(now - start >= mustRunDelay){
            method.apply(context, args);
            start = Date.now();
        }else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }

    }
}
```

应用场景：图片懒加载
