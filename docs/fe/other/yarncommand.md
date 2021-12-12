# yarn常用命令

## 修改镜像源

看当前使用的镜像源

```sh
yarn config get registry
```

临时修改

```sh
yarn save 软件名 --registry https://registry.npm.taobao.org/
```

全局修改

```sh
yarn config set registry https://registry.npm.taobao.org/
```
