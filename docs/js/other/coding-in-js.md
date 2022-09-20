# code in js

<https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html>
<https://www.51cto.com/article/661981.html>

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

|Unicode符号范围 (十六进制)     |        UTF-8编码方式（二进制）|
|------------------- |------------------------------------|
|0000 0000-0000 007F | 0xxxxxxx                           |
|0000 0080-0000 07FF | 110xxxxx 10xxxxxx                  |
|0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx         |
|0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx|

## method

### btoa & atob

- btoa base64编码
- atob base64解码
- 范围：U+0000 到 U+00FF (没有汉字)
- a ascii
- b binary

### String.prototype.charCodeAt

返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元

### String.prototype.codePointAt

返回 一个 Unicode 编码点值的非负整数

- String.fromCharCode(0)
- decodeURIComponent
- 转义

### 实践

- js 如何base64编码（兼容中文）

<https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-escape-string>
