# pnpm

*npm@3*之前采用非扁平化

```
node_modules
└─ foo
   ├─ index.js
   ├─ package.json
   └─ node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```

问题：

- 包经常创建太深的依赖树，这会导致 Windows 上出现长目录路径问题
- 包在不同的依赖项中需要时被多次复制粘贴

*npm@3*之后采用扁平化

```
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

问题：

1. 模块可以访问它们不依赖的包
2. 扁平化依赖树的算法非常复杂
3. 一些包必须复制到一个项目的*node_modules*文件夹中

pnpm 试图解决npm@3之前的问题，而不会使依赖关系树变平

`npm add express`

```
.bin
accepts
array-flatten
body-parser
bytes
content-disposition
cookie-signature
cookie
debug
depd
destroy
ee-first
encodeurl
escape-html
etag
express
```

`pnpm add express`

```
.pnpm
.modules.yaml
express
```

`express` 的依赖不在 `.pnpm/express@4.17.1/node_modules/express/node_modules/` 而是在 `.pnpm/express@4.17.1/node_modules/`

`express` 所有的依赖都软链至了 `node_modules/.pnpm/` 中的对应目录。 把 `express` 的依赖放置在同一级别避免了循环的软链

pnpm更多特性：

1. **安全。**与Yarn 一样，pnpm 有一个特殊文件，其中包含所有已安装包的校验和，以在执行每个已安装包的代码之前验证其完整性。
2. **离线模式。**pnpm 将所有下载的包 tarball 保存在本地注册表镜像中。当包在本地可用时，它从不发出请求。使用该`--offline`参数，可以完全禁止 HTTP 请求。
3. **速度。**pnpm 不仅比 npm 快，而且比 Yarn 快。无论是冷缓存还是热缓存，它都比 Yarn 快。Yarn 从缓存中复制文件，而 pnpm 只是从全局存储中链接它们