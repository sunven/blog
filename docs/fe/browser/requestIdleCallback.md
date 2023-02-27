# requestIdleCallback

先看这个：<https://www.w3.org/TR/requestidlecallback/>
<https://www.teqng.com/2022/02/08/2022%E5%B9%B4%E4%BA%86%E8%BF%98%E4%B8%8D%E6%87%82requestidlecallback%E4%B9%88%EF%BC%9F/>

- 确保您可以运行代码但又不会妨碍用户的好方法

```js
requestIdleCallback(deadline => {
 while (deadline.timeRemaining() > 0) {
   console.log(i++)
 }
)
```

```js
const app = document.getElementById('app')
const dateNow = () => {
  app.innerHTML = +Date.now()
  requestAnimationFrame(dateNow)
}
requestAnimationFrame(dateNow)
let i = 0
const arr = []
function work(deadline) {
  arr.push(performance.now())
  if (deadline.timeRemaining() > 0 && i < 20) {
    i++
    requestIdleCallback(work)
  } else {
    arr.reduce((pre, cur) => {
      console.log(cur - pre)
      return cur
    })
  }
}
requestIdleCallback(work)
```
