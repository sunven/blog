# Hexo 基本使用

1. `npm install -g hexo`：安装hexo

   - 依赖`node.js`

2. `hexo init`：初始化

1.  `npm install`

2.  `hexo server`：启动hexo

    - `hexo server --debug`：debug模式
    - 默认：http://localhost:4000/
    - `Ctrl+C`停止

3.  `hexo new "My Page"`：新建文章

    - 生产文章在`_posts`目录下
    - 也可以直接将markdown文件粘贴到该目录下

4.  `hexo generate`：生成静态网页

    - 在`public`目录下生成静态文件

5.  修改`_config.yml`文件

# Deployment

## Docs: http://hexo.io/docs/deployment.html

```
deploy:
  type: github
  repository: git@github.com:wenquansun/wenquansun.github.io.git
  branch: master
```

1. ``npm install hexo-deployer-git --save``

2. `hexo deploy`：发布

>每次部署，分三步

>1. hexo clean

>1. hexo generate

>1. hexo deploy

# 其他命令

- `hexo new page "pageName"` 新建页面

- `hexo help`  查看帮助

- `hexo version` 查看Hexo的版本

# 命令简写

- `hexo n` == `hexo new`

- `hexo g` == `hexo generate`

- `hexo s` == `hexo server`

- `hexo d` == `hexo deploy`

# 安装主题

1. 使用`$ git clone git@github.com:iissnan/hexo-theme-next.git`命令将主题clone到themes目录下

2. 找到`config.yml`文件修改主题

    ```
    theme: hexo-theme-next
    ```

> # references

- [Hexo搭建Github静态博客](http://www.cnblogs.com/zhcncn/p/4097881.html)

- [Hexo中文文档](https://hexo.io/zh-cn/docs/)