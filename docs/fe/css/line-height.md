# line-height

两基线的间距

![img](./images/1920px-Typography_Line_Terms.svg.png)

## 基线

- 4线3格的第3条线
- x 的下边缘

vertical-align:middle，middle 指的是基线往上 1/2 x-height 高度，并不是绝对的垂直居中对齐

ex 是 CSS 中的一个相对单位，指的是小写字母 x 的高度，就是 x-height。

内联元素的高度 = 固定高度 + 不固定高度

不固定的部分就是行距

半行距：行距分散在当前文字的上方和下方，上方的半行距不一定等于下方的半行距

- 行距 = 行高 − em-box
- 行距 = line-height - font-size

<https://blog.csdn.net/qq_15601471/article/details/119903856>

![img](./images/eb99806862cf45e0b1bd742faa2224b5.png)

![img](./images/ab9e387a414c4d0dbcbf8b100af9bde0.png)

![img](./images/4f18bff5f15e4f65a80927a1c7e797f8.png)

Arial 字体为例

2048 对应 100px

2048标准高度（em-square）。不同字体的标准高度不同，比如256、1000、1024、2048等等都可以；
上高为1638，下深为410，这一对可以称为默认的上高和下深，有了上高和下深自然就确定了baseline的位置；
win上高（1854）和win下深（434） 这一对则是windows系统下的上高和下深；HHead上高和HHead下深则是MacOS的，（我没有mac所以也没有测试）有的字体这两对上高和下深可能是不一致的；会出现同样的字体在不同的系统上，显示的位置不同。
leading（行距/线距），leading的值是一分为二的放在内容区域（content-area）上下两个地方。
有了windows系统下的上高和下深以及行距自然就知道了window下的总高度了2355
capital Height 大写字母的高度，所有大写字母高度都是一样的1467；
x-height 小写字母x的高度 1062；
字形上高1491和字形下深431则指的是，这套字体中所有的字形达到的最高点和最低点，可以看到有的字形是会突破标准的下深的，不同字体设计不同，有的可能会突破上高，但是一般不会突破系统的上高和下深；因为突破了系统的上高和下深，显示的时候可能会出现重叠的情况
