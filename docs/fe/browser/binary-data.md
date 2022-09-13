# Binary Data

Blob File...

## ArrayBuffer

![img](./images/arraybuffer-view-buffersource.svg)

![img](./images/arraybuffer-views.svg)

![img](./images/8bit-integer-256.svg)

![img](./images/8bit-integer-257.svg)

Uint8Array —— 将 ArrayBuffer 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位，因此只能容纳那么多）。这称为 “8 位无符号整数”。

- 8位1字节，16 字节 ArrayBuffer，用Uint8Array就相当于存16个小数字

```js
let buffer = new ArrayBuffer(16) // 创建一个长度为 16 的 buffer
let view = new Uint8Array(buffer) // 将 buffer 视为一个 8 位整数的序列
console.log('每个整数占用字节数', Uint8Array.BYTES_PER_ELEMENT) // 1
console.log('存储了多少个整数', view.length) // 16
console.log('buffer大小', view.byteLength) // 16
// 写入一个值
view[0] = 255 // 超过255  2的8次方取模的结果被保存了下来，因为8位最多表示255
// 遍历值
for (let i = 0; i < view.length; i++) {
  console.log(i, view[i])
}
```

- 字节数组,固定长度的原始二进制数据缓冲区
- 不能直接操作 ArrayBuffer 的内容,要操作需要视图
- 视图分为 TypedArray 或 DataView
  - TypedArray 类型化的数组 Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array BigInt64Array BigUint64Array
  - DataView：特殊的超灵活“未类型化”视图
- ArrayBufferView 是所有视图的总称
- BufferSource 是 ArrayBuffer 或 ArrayBufferView 的总称

``` text
Object > ArrayBuffer
       > ArrayBufferView > TypedArray > Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array
                         > DataView
```

ArrayBufferView 抽象类 ArrayBuffer 上“视图”之一的实例的基类，

DataView 一个可以从 二进制ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题

- 每个十六进制中的数字代表4个比特

9499938 十六进制 90f522
大端字节序：90f522 》10010000 11110101 00100010
小端字节序：22f590 》11110101 00100010 10010000

## 怎么产生

- 网络资源 ajax 请求一个图片
- 本地资源 input file 选择一个文件

```js
const image = document.querySelector('.my-image')
// 网络资源
fetch('./googlelogo_color_272x92dp.png')
  .then(response => response.blob())
  .then(blob => {
    const objectURL = URL.createObjectURL(blob)
    image.src = objectURL
  })
// 本地资源
document.getElementById('file1').onchange = function (e, a) {
  const objectURL = URL.createObjectURL(e.target.files[0])
  image.src = objectURL
}
```

<https://zhuanlan.zhihu.com/p/461151285>
<https://zh.javascript.info/binary>
<https://shanyue.tech/post/binary-in-frontend/#%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%9B%B8%E5%85%B3%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B>
