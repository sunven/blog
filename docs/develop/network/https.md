# HTTPS

## HTTP 的问题

- 窃听: 通信使用明文
  - 通信加密: HTTPS
  - 内容加密: body 加密
- 伪装: 没有验证双方身份
  - 客户端, 服务器都可能是伪装的
  - 来着不拒: Dos 攻击
- 篡改: 无法证明报文完整性
  - 请求/响应的内容可能有误: 中间人攻击

## HTTPS

> HTTP + 加密 + 认证 + 完整性保护 = HTTPS

![img](./images/Snipaste_2022-07-26_22-44-30.jpg)



如何保证公开秘钥？

### RSA秘钥协商

![img](./images/Snipaste_2022-07-26_22-55-39.jpg)

> 证书证明了服务端身份



1. 浏览器内部植入CA的公钥
2. 服务器向CA提出公钥申请
3. CA的私钥 + 服务器的公钥 = 数字签名
4. 服务器公钥 + 数字签名 = 证书
5. 服务器发送证书给客户端
6. 浏览器用CA的公钥验证证书，得到服务器的公钥
7. 客户端用服务器的公钥加密一个对称加密的秘钥给服务端
8. 后续回话内容都用对称秘钥加解密



1. Client Hello（Random，支持的密码套件、压缩方法，tls版本等）
2. Server Hello（Random，确定的密码套件、压缩方法，tls版本等）
3. 服务端发送证书给客户端
4. 客户端验证证书，得到公钥
5. 客户端生成一个随机数 pre master secret 用公钥加密，发给服务端
6. 服务端用私钥解密，得到pre master secret 
7. 客户端、服务端都可以用三个随机数 生成 对话密码  后续的对称加密用的秘钥

缺点

- 不具有前向安全性

整个握手阶段都不加密（也没法加密），都是明文的。因此，如果有人窃听通信，他可以知道双方选择的加密方法，以及三个随机数中的两个。整个通话的安全，只取决于第三个随机数（Premaster secret）能不能被破解。

虽然理论上，只要服务器的公钥足够长（比如2048位），那么Premaster secret可以保证不被破解。但是为了足够安全，我们可以考虑把握手阶段的算法从默认的[RSA算法](https://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)，改为 [Diffie-Hellman算法](https://zh.wikipedia.org/wiki/迪菲－赫尔曼密钥交换)（简称DH算法）。

采用DH算法后，Premaster secret不需要传递，双方只要交换各自的参数，就可以算出这个随机数。

前向安全性

长期使用的主密钥泄漏不会导致过去的会话密钥泄漏



### ECDHE

DH > DHE > ECDHE

TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256

TLS协议
ECDHE密钥交换（协商）算法
RSA签名加密算法 证书里的公钥必须是RSA的公钥
AES_128_GCM AES会话加密算法。用于加密消息流
SHA256  散列（摘要）算法 消息认证码算法

1. Client Hello（Random，支持的密码套件、压缩方法，tls版本等）--第一次握手
2. Server Hello（Random，确定的密码套件、压缩方法，tls版本等）
3. Certificate 证明服务端身份
4. Server Key Exchange 生成一对公钥和私钥，发送公钥给客户端，客户端用于生成pre master secret，为了保证这个公钥被篡改，用rsa签名
5. Server Hello Done 我发完了 第二次握手完毕

6. Client Key Exchange 生成一对公钥和私钥，发送公钥给服务端
7. Change Cipher Spec 客户端发：改变加密规范  用对称加密
8. Encrypted Handshake Message 客户端发：第三次握手完毕
9. Change Cipher Spec 服务端发：改变加密规范  用对称加密
10. Encrypted Handshake Message 服务端发：第四次握手完毕



<https://www.cnblogs.com/Netsharp/p/15926871.html>

<https://blog.csdn.net/weixin_60297362/article/details/123056506>



## reference

<http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html>

<https://blog.csdn.net/summer_fish/article/details/125279853>

<https://medium.com/swlh/understanding-ec-diffie-hellman-9c07be338d4a>

<https://ciphersuite.info/>
