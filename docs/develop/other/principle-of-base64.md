# base64 原理

## 原理

Base64 索引表：

| 数值 | 字符 |     | 数值 | 字符 |     | 数值 | 字符 |     | 数值 | 字符 |
| ---- | ---- | --- | ---- | ---- | --- | ---- | ---- | --- | ---- | ---- |
| 0    | A    | 16  | Q    | 32   | g   | 48   | w    |     |      |      |
| 1    | B    | 17  | R    | 33   | h   | 49   | x    |     |      |      |
| 2    | C    | 18  | S    | 34   | i   | 50   | y    |     |      |      |
| 3    | D    | 19  | T    | 35   | j   | 51   | z    |     |      |      |
| 4    | E    | 20  | U    | 36   | k   | 52   | 0    |     |      |      |
| 5    | F    | 21  | V    | 37   | l   | 53   | 1    |     |      |      |
| 6    | G    | 22  | W    | 38   | m   | 54   | 2    |     |      |      |
| 7    | H    | 23  | X    | 39   | n   | 55   | 3    |     |      |      |
| 8    | I    | 24  | Y    | 40   | o   | 56   | 4    |     |      |      |
| 9    | J    | 25  | Z    | 41   | p   | 57   | 5    |     |      |      |
| 10   | K    | 26  | a    | 42   | q   | 58   | 6    |     |      |      |
| 11   | L    | 27  | b    | 43   | r   | 59   | 7    |     |      |      |
| 12   | M    | 28  | c    | 44   | s   | 60   | 8    |     |      |      |
| 13   | N    | 29  | d    | 45   | t   | 61   | 9    |     |      |      |
| 14   | O    | 30  | e    | 46   | u   | 62   | +    |     |      |      |
| 15   | P    | 31  | f    | 47   | v   | 63   | /    |     |      |      |

例子：

| 文本（1 Byte）   | **A** |       |       |     |     |     |     |     |       |       |       |       |     |     |     |     |       |       |     |     |     |     |     |     |
| ---------------- | ----- | ----- | ----- | --- | --- | --- | --- | --- | ----- | ----- | ----- | ----- | --- | --- | --- | --- | ----- | ----- | --- | --- | --- | --- | --- | --- |
| 二进制位         | 0     | 1     | 0     | 0   | 0   | 0   | 0   | 1   |       |       |       |       |     |     |     |     |       |       |     |     |     |     |     |     |
| 二进制位（补 0） | 0     | 1     | 0     | 0   | 0   | 0   | 0   | 1   | **0** | **0** | **0** | **0** |     |     |     |     |       |       |     |     |     |     |     |     |
| Base64 编码      | **Q** | **Q** |       |     |     |     |     |     |       |       |       |       |     |     |     |     |       |       |     |     |     |     |     |     |
| 文本（2 Byte）   | **B** | **C** |       |     |     |     |     |     |       |       |       |       |     |     |     |     |       |       |     |     |     |     |     |     |
| 二进制位         | 0     | 1     | 0     | 0   | 0   | 0   | 1   | 0   | 0     | 1     | 0     | 0     | 0   | 0   | 1   | 1   |       |       |     |     |     |     |     |     |
| 二进制位（补 0） | 0     | 1     | 0     | 0   | 0   | 0   | 1   | 0   | 0     | 1     | 0     | 0     | 0   | 0   | 1   | 1   | **0** | **0** |     |     |     |     |     |     |
| Base64 编码      | **Q** | **k** | **M** |     |     |     |     |     |       |       |       |       |     |     |     |     |       |       |     |     |     |     |     |     |

解析：

1. 将 A 转换为二进制：01000001
2. 每 6 个分一份，不足的用 0 补齐：010000/010000

3. 将分好的每一份转为 10 进制，再去索引表取对应值：010000 得到 16,16 对应 Q
4. A 转换后就得到了 QQ

5. 在 2 步骤中，补了 4 个 0 就在最终结果后加两个'='，补了 2 个 0，就加一个'='
6. 最终 A 转换 base64 为：QQ==，BC 转换 base64 为：QkM=

## js 实现 base64 转换

```javascript
//索引表
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
  ''
)

//将二进制转换为base64编码
function binToBase64(bitString) {
  var result = ''
  var tail = bitString.length % 6
  var bitStringTemp1 = bitString.substr(0, bitString.length - tail)
  var bitStringTemp2 = bitString.substr(bitString.length - tail, tail)

  for (var i = 0; i < bitStringTemp1.length; i += 6) {
    var index = parseInt(bitStringTemp1.substr(i, 6), 2)
    result += code[index]
  }

  bitStringTemp2 += new Array(7 - tail).join('0')

  if (tail) {
    result += code[parseInt(bitStringTemp2, 2)]
    result += new Array((6 - tail) / 2 + 1).join('=')
  }

  return result
}

//将base64编码转换为二进制
function base64ToBin(str) {
  var bitString = ''
  var tail = 0

  for (var i = 0; i < str.length; i++) {
    if (str[i] != '=') {
      var decode = code.indexOf(str[i]).toString(2)
      bitString += new Array(7 - decode.length).join('0') + decode
    } else {
      tail++
    }
  }

  return bitString.substr(0, bitString.length - tail * 2)
}

//将字符转换为二进制
function stringToBin(str) {
  var result = ''
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i).toString(2)
    result += new Array(9 - charCode.length).join('0') + charCode
  }

  return result
}

//将二进制转换为字符串
function binToStr(Bin) {
  var result = ''
  for (var i = 0; i < Bin.length; i += 8) {
    result += String.fromCharCode(parseInt(Bin.substr(i, 8), 2))
  }

  return result
}

console.log(binToStr(base64ToBin('QQ==')))
console.log(binToBase64(stringToBin('BC')))
```

## 图片 base64

1. 通过 canvas 得到图片的二进制数据
2. 在二进制字符串中"藏好宽高"

3. 将二进制数据转为 base64

```html
<body>
  <img id="img1" src="googlelogo_color_92x30dp.png" />
  <textarea style="width:300px;height:200px;" id="txt1"></textarea>
  <canvas id="myCanvas" width="184" height="60"></canvas>
</body>
```

```javascript
function numToString(num) {
  var bin = num.toString(2)
  return new Array(9 - bin.length).join(0) + bin
}

//获取canvas
function getCanvas(w, h) {
  var c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

//获取图片二进制数据
function getPixels(img) {
  var c = getCanvas(img.width, img.height)
  var ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  return ctx.getImageData(0, 0, c.width, c.height)
}

//图片转base64
function img2Base64(img) {
  var imgData = getPixels(img).data
  var imgWidth = getPixels(img).width
  var imgHeight = getPixels(img).height
  var bin = ''
  for (var i = 0; i < imgData.length; i++) {
    bin += numToString(imgData[i])
  }

  bin = bin + stringToBin('$$' + imgWidth + ',' + imgHeight + '$$')
  return binToBase64(bin)
}

//绘图
function paint(imgData) {
  var canvas = document.getElementById('myCanvas')
  var ctx = canvas.getContext('2d')
  ctx.fillRect(0, 0, imgData.width, imgData.height)
  ctx.putImageData(imgData, 0, 0)
}

//base64转图片
function base642img(data) {
  var str = binToStr(base64ToBin(data))
  var imgWidth = str.match(/\$\$(\d+),(\d+)\$\$$/, '')[1]
  var imgHeight = str.match(/\$\$(\d+),(\d+)\$\$$/, '')[2]
  var imgData = base64ToBin(data).replace(
    stringToBin('$$' + imgWidth + ',' + imgHeight + '$$'),
    ''
  )

  var ImageDataArray = new Uint8ClampedArray(imgWidth * imgHeight * 4)

  for (var i = 0; i < ImageDataArray.length; i++) {
    ImageDataArray[i] = parseInt(imgData.substr(i * 8, 8), 2)
  }

  return new ImageData(ImageDataArray, imgWidth, imgHeight)
}

window.onload = function() {
  const base64 = img2Base64(document.getElementById('img1'))
  document.getElementById('txt1').value = base64
  paint(base642img(base64))
}
```
