# 各种尺寸

![img](./images/whatever-sizing.png)

## clientWidth、clientHeight

元素内部的宽(高)度(单位像素)，包含内边距，但不包括垂直(水平)滚动条、边框和外边距

>  width(height) + padding - 滚动条

![img](./images/Dimensions-client.png)



- 只读
- 此属性会将获取的值四舍五入取整数
- 内联元素以及没有 CSS 样式的元素的 `clientWidth` 属性值为 0
- 在`<html>`上时，返回viewport的宽(高)度(不包括任何滚动条，html不能设置border，包含margin)

## clientTop、clientLeft

一个元素顶部(左边)边框的宽度（以像素表示）。不包括外边距或内边距。

> 就是border

- 只读
- clientLeft:如果元素的文本方向是从右向左（RTL, right-to-left），并且由于内容溢出导致左边出现了一个垂直滚动条，则该属性包括滚动条的宽度

## scrollWidth、scrollHeight

元素内容高宽(高)度，包括由于溢出导致的视图中不可见内容

- 只读
- 包含元素的内边距，但不包括边框，外边距或滚动条

- 包括 [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) 和 [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)这样的伪元素
- 属性将会对值四舍五入取整

## scrollTop、scrollLeft

可以读取或设置元素滚动条到元素左(上)边的距离

- 如果元素不能滚动（比如：元素没有溢出），值是0。
- 如果设置的值小于0，那么值将变为0。
- 如果设置的值大于元素内容最大宽度，那么值将被设为元素最大高(宽)度

## offsetWidth、offsetHeight

返回一个元素的布局宽度。

- 只读
- 属性将会对值四舍五入取整

- 包含元素的边框(border)、内边距(padding)、滚动条(scrollbar)、以及CSS设置的宽(高)度的值

### offsetParent

最近的定位父元素或者最近的 `table` `td` `th` `body`元素

- 当元素的 `style.display` 设置为 "none" 时，`offsetParent` 返回 `null`

## offsetTop、offsetLeft

当前元素相对于其 [`offsetParent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 元素的顶部(左边)内边距的距离

> 当前元素margin + offsetParent元素padding + offsetParent元素border + offsetParent元素margin

## getClientRects

返回一个指向客户端中每一个盒子的边界矩形的矩形集合

- 一般使用getBoundingClientRect较多

## getBoundingClientRect

元素的大小及其相对于视口的位置

- 如果是标准盒子模型(content-box)，元素的尺寸等于`width/height` + `padding` + `border-width`的总和。

- 如果`box-sizing: border-box`，元素的的尺寸等于 `width/height`

![img](./images/rect.png)





## 问题与解决方案

### 判定元素是否滚动到底

如果元素滚动到底，下面等式返回true，没有则返回false.

```
element.scrollHeight - element.scrollTop === element.clientHeight
```

当容器不滚动但有溢出的子容器时，这些检查可以确定容器能否滚动：

```
window.getComputedStyle(element).overflowY === 'visible' window.getComputedStyle(element).overflowY !== 'hidden'
```