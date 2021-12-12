# npm 常用命令

## 其它

1. `npm init`：会引导你创建一个package.json文件，包括名称、版本、作者这些信息等
2. `npm root`：查看当前包的安装路径
3. `npm root -g`：查看全局的包的安装路径
4. `npm -v`：查看npm安装的版本
5. `npm help`：查看帮助命令
6. `npm set global=true`：设定安装模式
7. `npm get global`：查看当前使用的安装模式
8. `npm root -g`：查看全局包目录
9. `npm ls -g`：查看全局包
10. `npm ls -g --depth 0`：查看全局包

11. `npm ls vue -g`：查看vue目录

## 增

1. `npm install <moudleName> -g` ：将包安装到全局环境中
2. `npm install <moudleName> --save` ：本地安装
3. `npm install express`：默认会安装express的最新版本
4. `npm install express@3.0.6`：安装指定版本

## 删

1. `npm uninstall <moudleName>`：卸载node模块

## 改

1. `npm update <moduleName>`：更新node模块
2. `npm rebuild <moduleName>`：用于更改包内容后进行重建

## 查

1. `npm view <moudleName> dependencies`：查看包的依赖关系
2. `npm view <moduleName> repository.url`：查看包的源文件地址
3. `npm view <moduleName> engines`：查看包所依赖的Node的版本
4. `npm help folders`：查看npm使用的所有文件夹
5. `npm list`：查看当前目录下已安装的node包
6. `npm view <moduleNames>`：查看node模块的package.json文件夹
7. `npm view <moduleName> <labelName>`：查看package.json文件夹下某个标签的内容
8. `npm search <packageName>`：发布一个npm包的时候，需要检验某个包名是否已存在
9. `npm outdated`：检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
10. `npm help json`：打开package.json


## 更新npm至最新版本

```
npm install -g npm
```

## npm源的配置

### 临时

> npm --registry https://registry.npm.taobao.org install express 

### 持久使用

> npm config set registry https://registry.npm.taobao.org 
>
> npm config set electron_mirror https://npm.taobao.org/mirrors/electron

配置后可通过下面方式来验证是否成功 

> npm config get registry 

或 

> npm info express 

### 通过cnpm使用

> npm install -g cnpm –registry=https://registry.npm.taobao.org



## 解释

### peerDependencies

`--legacy-peer-deps`:在安装时忽略所有*peerDependencies*



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