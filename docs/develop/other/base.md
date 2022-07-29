# git 基础

## 基本操作

初始化：`git init`

添加文件到 Git 仓库：

1. `git add <file>`：可反复多次使用，添加多个文件

2. `git commit`：完成

`git status`：工作区的状态

`git diff`：可以查看修改内容

`git reset --hard commit_id`：版本恢复，`HEAD`指向的版本就是当前版本

`git log`：查看提交历史

`git reflog`：查看命令历史，以便确定要回到未来的哪个版本

`git checkout -- file`：丢弃工作区的修改

如果修改未添加到暂缓区，想丢弃工作区的修改：

1. `git checkout -- file`

如果修改已经添加到了暂缓区，想丢弃修改：

1. `git reset HEAD file`
2. `git checkout -- file`

如果修改已经添加到了暂缓区,并且提交到了版本库：

1. `git reset --hard commit_id` 版本回退

`git rm`：删除

`$ ssh-keygen -t rsa -C "youremail@example.com"`：创建 SSH Key

```shell
# 项目配置
git config --local -l
# 用户配置
git config --global -l
# 系统配置
git config --system -l
```

## 远程仓库

关联一个远程库： 1.`git remote add origin git@server-name:path/repo-name.git`

2.`git push -u origin master`：第一次推送 master 分支的所有内容；

3.`git push origin master`：以后的推送修改

`git remote -v`：查看远程库信息

`$ git clone git@github.com:michaelliao/gitskills.git`：克隆

## 分支管理

> Git 鼓励大量使用分支

### 分支基本操作

`git branch -a`：查看远程分支

`git branch`：查看分支

`git branch <name>`：创建分支

`git checkout <name>`：切换分支

`git checkout -b <name>`：创建+切换分支

`git merge <name>`：合并某分支到当前分支

`git branch -d <name>`：删除分支

`git log --graph --pretty=oneline --abbrev-commit`：查看分支的合并情况

`git merge --no-ff -m "merge with no-ff" dev`：禁用 Fast forward

> 注意`--no-ff`参数，表示禁用 Fast forward
> 合并分支时，加上--no-ff 参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而 fast forward 合并就看不出来曾经做过合并

`git checkout -b branch-name origin/branch-name`：在本地创建和远程分支对应的分支

> 本地和远程分支的名称最好一致

`git branch --set-upstream branch-name origin/branch-name`：建立本地分支和远程分支的关联

`git pull`：更新分支

`git branch -D <name>`：删除分支

`git push origin test` 把分支推到远程分支

## Bug

修复 bug 时，我们会通过创建新的 bug 分支进行修复，然后合并，最后删除：

1. `git stash`：存储工作现场

2. `git stash pop`：恢复并删除 stash 内容

`git stash apply`：恢复工作现场

`git stash list`：查看 stash 内容

## 冲突

1. 试图用`git push origin branch-name`推送自己的修改

2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并

3. 如果合并有冲突，则解决冲突，并在本地提交

4. 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功

5. 如果`git pull`提示**no tracking information**，则说明本地分支和远程分支的链接关系没有创建，
   用命令`git branch --set-upstream branch-name origin/branch-name`

## 标签

### 本地

`git tag <name>`：用于新建一个标签，默认为 HEAD，也可以指定一个 commit id

`git tag -a <tagname> -m "qaq..."`：可以指定标签信息

`git tag -s <tagname> -m "qaq..."`：可以用 PGP 签名标签

`git show <tagname>`：查看标签详细信息

`git tag`：可以查看所有标签

### 远程

`git push origin <tagname>`：推送一个本地标签

`git push origin --tags`：推送全部未推送过的本地标签

`git tag -d <tagname>`：删除一个本地标签

`git push origin :refs/tags/<tagname>`：删除一个远程标签

## 代理

ssh

`~/.ssh/config`文件

Socks 代理

```sh
Host github.com
HostName github.com
ProxyCommand nc -v -x 127.0.0.1:1086 %h %p

```

http

指定github.com

```sh
git config --global http.https://github.com.proxy http://127.0.0.1:8080
git config --global https.https://github.com.proxy http://127.0.0.1:8080
```

取消

```sh
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 其它

### 查看提交次数

总提交次数：`git log --oneline | wc -l`

某个用户提交次数：`git log --author="用户名" --oneline | wc -l`

每个用户提交次数：`git shortlog -s -n`

某个用户时间范围内提交次数：`git log --author="用户名" --since="2014-07-01" --oneline | wc -l`

### 代码量统计

个人代码量：

```sh
git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

每个人代码量

```sh
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

### 同步更新fork的仓库

1. 添加一个将被同步给 fork 远程的上游仓库

```sh
git remote add upstream https://github.com/apache/flink.git
```

2.从上游仓库 fetch 分支和提交点，传送到本地，并会被存储在一个本地分支 upstream/master

```sh
git fetch upstream
```

3.在本地分支上，执行合并

```sh
git merge upstream/master
```

4.推送到远程

```sh
git push origin master
```

## 问题

- [Please enter a commit message to explain why this merge is necessary](http://www.cnblogs.com/wei325/p/5278922.html)

- fatal: refusing to merge unrelated histories

git pull --allow-unrelated-histories

- Git fetch 和 git pull 的区别

[http://blog.csdn.net/hudashi/article/details/7664457](http://blog.csdn.net/hudashi/article/details/7664457)

### 多账号问题

[
一台电脑连接多个 GitHub 账号下的仓库](https://blog.csdn.net/kingsleytong/article/details/70176518)

[Git 如何切换账户](https://blog.csdn.net/junloin/article/details/75197880)

[解决 切换 github 账号后无法 push 的问题](https://www.jianshu.com/p/391a1e591eec)

[Git 最著名报错 “ERROR: Permission to XXX.git denied to user”终极解决方案](https://www.jianshu.com/p/12badb7e6c10)

[Git's famous “ERROR: Permission to .git denied to user”](https://stackoverflow.com/questions/5335197/gits-famous-error-permission-to-git-denied-to-user)

### crlf

```sh
// 拒绝提交包含混合换行符的文件 （一般设置为true）
git config --global core.safecrlf true

// 提交检出均不转换
git config --global core.autocrlf false
```

### no matching host key type found. Their offer: ssh-rsa

 配置好公私钥之后，仍然无法直接用 git ssh的方式，下载代码

解决：

.ssh\config增加以下二项

```
HostKeyAlgorithms ssh-rsa
PubkeyAcceptedKeyTypes ssh-rsa
```

### fatal: early EOF fatal: fetch-pack: invalid index-pack output

<https://stackoverflow.com/questions/21277806/fatal-early-eof-fatal-index-pack-failed>

```sh
# Git 服务器的内存不够了，导致压缩传输数据失败，服务器直接挂了
# 整数 -1..9，表示默认压缩级别。 -1 是 zlib 默认值。0 表示不压缩，9 是最慢的。
# 关闭压缩
git config --global core.compression=0
# 下载最近一次提交
git clone --depth 1 <repo_URI>
# 拉取剩余部分
git fetch --unshallow 
# 常规拉取
git pull --all
```