# performance

## 加载性能

- 减少请求
  - 考虑是否真的需要图片
  - 图片 base64
  - Sprite
  - js、css 合并
  - 减少库的使用（[You Might Not Need jQuery](https://github.com/HubSpot/YouMightNotNeedjQuery)）
- 减少资源大小
  - 减少 dom 数量
  - 图片选择
    - WebP
    - iconfont
  - 图片优化
    - 删除元数据（相机型号、焦距等）
    - 图片大小
    - 图片质量
    - 图片压缩
  - 代码压缩
  - splitChunks
- http/2
  - 服务端支持
- gzip
  - 服务端支持
- 缓存
  - http 缓存
    - 强制
    - 协商
- cdn
- Resource Hints
  - dns-prefetch
  - prefetch
  - ...

## 渲染性能

- 优化 javsscript 执行
  - requestAnimationFrame
  - web worker
- css
  - 降低选择器的复杂性
  - BEM
- 避免布局（重排）
- 使用 flexbox 而不是较早的布局模型
- 避免强制同步布局
- 避免布局抖动(<https://github.com/wilsonpage/fastdom>)
- 简化绘制的复杂度、减小绘制区域(<https://developers.google.com/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas>)
- 坚持仅合成器的属性和管理层计数 (<https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count>)
- 使输入处理程序去除抖动(<https://developers.google.com/web/fundamentals/performance/rendering/debounce-your-input-handlers>)
