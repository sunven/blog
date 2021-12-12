# 0.1+0.2=?

## 小数在计算机中如何存储

1. 先把浮点数转成对应的二进制数，并用科学计数法表示
2. 再把这个数值通过[IEEE 754](https://link.juejin.im/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FIEEE_754)标准表示成真正会在计算机中存储的值

## 精度丢失

1. 0.1 和 0.2 转成二进制之后都是一个无限循环的数
2. 所以要进行四舍五入

## 安全整数

Number.MAX_SAFE_INTEGER ~ Number.MAX_VALUE

## 解决方案

<https://github.com/josdejong/mathjs>

<https://github.com/nefe/number-precision>

参考：

<https://juejin.im/post/5a6fce10f265da3e261c3c71>

<https://blog.angularindepth.com/javascripts-number-type-8d59199db1b6>
