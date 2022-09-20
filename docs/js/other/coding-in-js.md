# code in js

## 编码

### ASCII

- 128个字符的编码
- 空格32 A 65
- 英语够用了
- 一个字符占一个字节（8位2进制）

### GB2312

2个字节表示一个字符（256 x 256 = 65536） 收录了六千多个常用的简体汉字及一些符号，数字，拼音等字符

### Unicode

字符集标准，将世界上所有的符号都纳入其中。每一个符号都给予一个独一无二的编码

范围是 0x0000 - 0x10FFFF , 可以容纳一百多万个字符

### utf-8

- Unicode 的实现方式之一
- 变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度
- UTF-16 也是一种变长字符编码, 这种编码方式比较特殊, 它将字符编码成 2 字节 或者 4 字节
- 对于英语字母，UTF-8 编码和 ASCII 码是相同的

<https://asecuritysite.com/coding/asc2>

规则

- 对于单字节的符号，字节的第一位设为0
- 对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10

|Unicode符号范围 (十六进制)     |        UTF-8编码方式（二进制）|
|------------------- |------------------------------------|
|0000 0000-0000 007F | 0xxxxxxx                           |
|0000 0080-0000 07FF | 110xxxxx 10xxxxxx                  |
|0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx         |
|0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx|

- 严的 Unicode 是4E25（100111000100101）
- 范围：0000 0800 - 0000 FFFF
- 格式是1110xxxx 10xxxxxx 10xxxxxx
- 从后向前的顺序依次填入格式中的 x 字符，多出的二进制补为 0
- UTF-8 编码是11100100 10111000 10100101，转换成十六进制就是E4B8A5

## method

### btoa & atob

- btoa base64编码
- atob base64解码
- 范围：U+0000 到 U+00FF (没有汉字)
- a > ascii b > binary

### String.prototype.charCodeAt

返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元

### String.prototype.codePointAt

返回 一个 Unicode 编码点值的非负整数

```js
'严'.codePointAt(0)  // 20005
// 严的 Unicode 是4E25 4E25 转十进制就是20005
```

### String.fromCharCode

返回由指定的 UTF-16 代码单元序列创建的字符串，范围介于 `0` 到 `65535`（`0xFFFF`）之间

```js
String.fromCharCode(65, 66, 67);   // 返回 "ABC"
String.fromCharCode(0x2014);       // 返回 "—"
String.fromCharCode(0x12014);      // 也是返回 "—"; 数字 1 被剔除并忽略
String.fromCharCode(8212);         // 也是返回 "—"; 8212 是 0x2014 的十进制表示
```

### String.fromCodePoint

返回使用指定的代码点序列创建的字符串

```js
String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
```

- codePointAt 是 charCodeAt 的加强
- fromCodePoint 是 fromCharCode 的加强
- charCodeAt 与 fromCharCode 互反
- codePointAt 与 fromCodePoint 互反

### escape & unescape

生成新的由十六进制转义序列替换的字符串

排除：ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./

当该值小于等于 0xFF 时，用一个 2 位转义序列: `%xx` 表示。大于的话则使用 4 位序列：%**u**xxxx 表示

```js
escape("abc123");     // "abc123"
escape('严') // '%u4E25'
```

### encodeURI & decodeURI

对应的 Unicode 的 UTF-8 编码的十六进制格式

排除：

- 字母数字
- ;,/?:@&=+$
- -_.!~*'()
- `#`

```js
// 严 > 4E25 > E4B8A5 > %E4%B8%A5
encodeURI('严') //'%E4%B8%A5'
```

因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符

### encodeURIComponent & decodeURIComponent

排除：

- 字母数字
- -_.!~*'()

### 实践

- js 如何base64编码（兼容中文）
