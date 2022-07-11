# 页面生命周期

![img](./images//page-lifecycle.png)

## 刷新一个页面

触发 pagehide 事件:

passive > hidden > terminated > active

## a到b页面

a 页面触发 pagehide > freeze 事件:

hidden > frozen

b 页面:

active

## 后退/前进

之前页面触发 pagehide > freeze 事件:

hidden > frozen

之后页面触发 resume > visibilitychange 事件

hidden > passive

## 关闭页签

触发 pagehide 事件

hidden > terminated

## reference

<https://developer.chrome.com/blog/page-lifecycle-api/>

<https://github.com/GoogleChromeLabs/page-lifecycle>

<https://page-lifecycle.glitch.me/>
