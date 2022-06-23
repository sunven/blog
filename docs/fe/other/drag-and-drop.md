# 拖放

## 可拖放 - draggable

```html
<img draggable="true" />
```

## 拖动什么 - ondragstart

- drag(event) 规定了被拖动的数据
- dataTransfer.setData() 设置被拖数据的数据类型和值
- 数据类型是 "Text"，值是可拖动元素的 id ("img1")

## 放到何处 - ondragover

- ondragover 事件规定在何处放置被拖动的数据。
- 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）

## 进行放置 - ondrop

- 当放置被拖数据时，会发生 drop 事件
- 通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
- 被拖数据是被拖元素的 id ("drag1")
- 把被拖元素追加到放置元素（目标元素）中

## 事件详解

`DataTransfer` 拖拽对象用来传递的媒介，使用一般为`Event.dataTransfer`

`ondragstart` 当拖拽元素开始被拖拽的时候触发的事件，此事件作用在`被拖曳元素上`

`ondragenter` 当拖拽元素进入目标元素的时候触发的事件，此事件作用在`目标元素上`

`ondragover` 拖拽元素在目标元素上移动的时候触发的事件，此事件作用在`目标元素上`

`ondrop` 被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在`目标元素上`

`ondragend` 当拖拽完成后触发的事件，此事件作用在`被拖曳元素上`

`Event.preventDefault()` 方法：阻止默认的些事件方法等执行。在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发。另外，如果是从其他应用软件或是文件中拖东西进来，尤其是图片的时候，默认的动作是显示这个图片或是相关信息，并不是真的执行drop。此时需要用用document的ondragover事件把它直接干掉

`Event.effectAllowed` 就是拖拽的效果 node copy move

## Reference

<https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API>

<https://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/>
