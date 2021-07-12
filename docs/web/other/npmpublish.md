# 发布项目到npm

1. 在官网注册npm账号
2. 用户验证，命令行执行

```
npm adduser 
```

3. 发布模块，在模块的根文件夹执行

```
npm publish
```

4. 更新版本

```
 npm version 0.0.4
 npm publish
```
如果是git库时，会为新版本号创建一条提交信息，package版本号会自动递增。