

# CSS 揭秘

## CSS 编码技巧

### 尽量减少重复代码

- 代码已维护vs代码量少
- currentColor

### 相信你的眼睛，而不是数字

些视觉上的错觉在任何形式的视觉设计中都普遍存在

字母的形状在两端都比较整齐，而顶部和底部则往往参差不齐

### 关于响应式网页设计

实现弹性可伸缩的布局，并在媒体查询的各个断点区间内指定相应的尺寸

- 使用百分比长度来取代固定长度。如果实在做不到这一点，也应该尝试使用与视口相关的单位（vw、vh、vmin 和vmax），它们的值解析为视口宽度或高度的百分比。
- 当你需要在较大分辨率下得到固定宽度时，使用 max-width 而不是width，因为它可以适应较小的分辨率，而无需使用媒体查询。
-  不要忘记为替换元素（比如 img、object、video、iframe 等）设置一个max-width，值为100%。
-  假如背景图片需要完整地铺满一个容器，不管容器的尺寸如何变化，background-size: cover 这个属性都可以做到。但是，我们也要时刻牢记——带宽并不是无限的，因此在移动网页中通过CSS 把一张大图缩小显示往往是不太明智的。
-  当图片（或其他元素）以行列式进行布局时，让视口的宽度来决定列的数量。弹性盒布局（即Flexbox）或者display: inline-block加上常规的文本折行行为，都可以实现这一点。
-  在使用多列文本时，指定 column-width（列宽）而不是指定column-count（列数），这样它就可以在较小的屏幕上自动显示为单列布局

### 合理使用简写

### 我应该使用预处理器吗

## 背景与边框

### 半透明边框

```css
div{
  border: 10px solid hsla(0,0%,100%,.5);
  background: white;
  background-clip: padding-box;
}
```

### 多重边框

```css
div{
  background: yellowgreen;
  box-shadow: 0 0 0 10px #655,
  						0 0 0 15px deeppink,
  						0 2px 5px 15px rgba(0,0,0,.6);
}
```

outline

```css
div{
  background: yellowgreen;
  border: 10px solid #655;
  outline: 5px solid deeppink;
}
```

### 灵活的背景定位

#### background-position

```css
div{
  background: url(code-pirate.svg)
							no-repeat bottom right #58a;
	background-position: right 20px bottom 10px;
}
```

#### background-origin

```css
div{
  padding: 10px;
  background: url("code-pirate.svg") no-repeat #58a
  						bottom right; /* 或 100% 100% */
  background-origin: content-box;
}
```

#### calc()

```css
div{
  background: url("code-pirate.svg") no-repeat;
	background-position: calc(100% - 20px) calc(100% - 10px);
}
```

### 边框内圆角

```html
<div class="something-meaningful"><div>
I have a nice subtle inner rounding,
don't I look pretty?
</div></div>
```

```css
.something-meaningful {
  background: #655;
  padding: .8em;
}
.something-meaningful > div {
  background: tan;
  border-radius: .8em;
  padding: 1em;
}
```

### 条纹背景

`background: linear-gradient(#fb3 20%, #58a 80%);`

容器顶部的20% 区域被填充为#fb3 实色，而底部20% 区域被填充为#58a 实色。真正的渐变只出现在容器60% 的高度区域

> 如果多个色标具有相同的位置，它们会产生一个无限小的过渡区域，过渡的起止色分别是第一个和最后一个指定值。从效果上看，颜色会在那个位置突然变化，而不是一个平滑的渐变过程

```css
div{
  background: linear-gradient(#fb3 50%, #58a 50%);
	background-size: 100% 30px;
}
```

> 如果某个色标的位置值比整个列表中在它之前的色标的位置值都要小，则该色标的位置值会被设置为它前面所有色标位置值的最大值

```css
div{
  background: linear-gradient(#fb3 30%, #58a 0);
  /* background: linear-gradient(#fb3 30%, #58a 30%); */
	background-size: 100% 30px;
}
```

## 垂直居中

### 基于绝对定位

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3em; /* 6/2 = 3 */
  margin-left: -9em; /* 18/2 = 9 */
  width: 18em;
  height: 6em;
}
```

借助calc

```css
main {
  position: absolute;
  top: calc(50% - 3em);
  left: calc(50% - 9em);
  width: 18em;
  height: 6em;
}
```

> 局限在于它要求元素的宽高是固定的

借助translate()

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- 如果需要居中的元素已经在高度上超过了视口，那它的顶部会被视口裁切掉

### 基于视口单位

```css
main {
  width: 18em;
  padding: 1em 1.5em;
  margin: 50vh auto 0;
  transform: translateY(-50%);
}
```

### 基于Flexbox

```css
body {
  display: flex;
  min-height: 100vh;
  margin: 0;
}
main {
	margin: auto;
}
```

文本也居中

```css
main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18em;
  height: 10em;
}
```

