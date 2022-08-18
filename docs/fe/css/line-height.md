# line-height

![img](./images/1920px-Typography_Line_Terms.svg.png)

两基线的间距

- 4线3格的第3条线
- x 的下边缘

vertical-align:middle。这里的 middle 是中间的意思。注意，跟上面的 median（中线）不是一个
意思。在 CSS 世界中，middle 指的是基线往上 1/2 x-height 高度

并不是绝对的垂直居中对齐

ex 是 CSS 中的一个相对单位，指的是小写字母 x 的高度，没错，就是指 x-height。

内联元素的高度由固定高度和不固定高度组成，这个不固定的部
分就是这里的“行距”

，“行距”分散在当前文字的上方和下方，也就是即使是第一行文字，其上方也
是有“行距”的，只不过这个“行距”的高度仅仅是完整“行距”高度的一半，因此，也被称为“半
行距”

行距 = 行高− em-box
行距 = line-height - font-size
