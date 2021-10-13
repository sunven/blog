## 加载

- html js css 压缩

- 浏览器缓存
- 抽取公共资源
- 服务器gzip（除开图片）
- splitChunks



### 图片

- 不要缩放，注意尺寸大小
- CSS Sprite
- iconfont
- WebP



### CDN



## 运行

减少重排重绘



重排（reflow)：布局发生变化，大小，删除添加元素

重绘（repaint)：视觉属性，颜色

重排一定会引发重绘，而重绘不一定会引发重排



查看css属性是否引发重排或重绘

https://csstriggers.com/



解决

- 尽量不用js操作样式，浏览器没次对元素样式进行读操作时，都必须进行一次重新渲染（重排 + 重绘），所以我们在使用JS对元素样式进行读写操作时，最好将两者分离开，先读后写，避免出现两者交叉使用的情况
- 通过class批量更改样式
- visibility: hidden
- DOM不要过深，多用伪元素，box-shadow
- 图片渲染器指定大小。 img大小
- 

### js 

代码性能



## 部署

nodejs处理IO密集型请求

Pm2

负载均衡

nginx



## 工具

chrome Lighthouse

https://developers.google.cn/speed/pagespeed/insights/

https://web.dev/lighthouse-performance/