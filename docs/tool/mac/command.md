# Mac 常用命令

## 软件提示已损坏，需要移到废纸篓的解决方法

```empty
sudo spctl --master-disable
```

```empty
xattr -r -d com.apple.quarantine <path>
```

`<path>`是你下载的应用程序的路径，一般在/Applications/应用程序名字

## 查看隐藏文件

**Command+Shift+.** 可以显示隐藏文件、文件夹，再按一次，恢复隐藏

- `command -v npm`：查看命令来源
- `open /usr/local/bin`：用 finder 打开目录
- `open -a typora /Users/seven/project/blog/docs`:用 typora 打开

## Homebrew

### 安装

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### 卸载

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

### 换源

zsh 终端下：

```shell
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
brew update

echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles/bottles' >> ~/.zshrc
source ~/.zshrc
```

### 常用命令

- 安装软件，如：brew install oclint
- 卸载软件，如：brew uninstall oclint
- 搜索软件，如：brew search oclint
- 更新软件，如：brew upgrade oclint
- 查看安装列表， 如：brew list
- 更新 Homebrew，如：brew update

## launchctl

launchctl 将根据 plist 文件的信息来启动任务

### plist 目录

- `~/Library/LaunchAgents` 由用户自己定义的任务项
- `/Library/LaunchAgents` 由管理员为用户定义的任务项,用户登陆系统后才会被执行

- `/Library/LaunchDaemons` 由管理员定义的守护进程任务项,只要系统启动了，哪怕用户不登陆系统也会被执行
- `/System/Library/LaunchAgents` 由 Mac OS X 为用户定义的任务项

- `/System/Library/LaunchDaemons` 由 Mac OS X 定义的守护进程任务项

### plist 文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <!-- Label唯一的标识 -->
        <key>Label</key>
        <string>com.demo.plist</string>
        <!-- 指定要运行的脚本 -->
        <key>ProgramArguments</key>
        <array>
            <string>/Users/demo/run.sh</string>
        </array>
        <!-- 指定要运行的时间 -->
        <key>StartCalendarInterval</key>
        <dict>
            <key>Minute</key>
            <integer>00</integer>
            <key>Hour</key>
            <integer>22</integer>
        </dict>
        <!-- 标准输出文件 -->
        <key>StandardOutPath</key>
        <string>/Users/demo/run.log</string>
        <!-- 标准错误输出文件，错误日志 -->
        <key>StandardErrorPath</key>
        <string>/Users/demo/run.err</string>
    </dict>
</plist>
```

- Label：对应的需要保证全局唯一性；
- Program：要运行的程序；

- ProgramArguments：命令语句
- StartCalendarInterval：运行的时间，单个时间点使用 dict，多个时间点使用 array `<dict>`

- StartInterval：时间间隔，与 StartCalendarInterval 使用其一，单位为秒
- StandardInPath、StandardOutPath、StandardErrorPath：标准的输入输出错误文件，这里建议不要使用 .log 作为后缀，会打不开里面的信息。

- 定时启动任务时，如果涉及到网络，但是电脑处于睡眠状态，是执行不了的，这个时候，可以定时的启动屏幕就好了。

### 常用命令

```shell
1.显示当前的启动脚本
launchctl list
# 查看任务列表, 使用 grep '任务部分名字' 过滤
launchctl list | grep 'com.demo'

2.开机时自动启动Apache服务器
launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist

3.设置开机启动并立即启动改服务
launchctl load -w   **.pist

4. 设置开机启动但不立即启动服务
launchctl load **.pist

5. 停止正在运行的启动脚本
launchctl unload [path/to/script]

6. 再加上-w选项即可去除开机启动
launchctl unload -w [path/to/script]

7. 开始任务
launchctl start com.demo.plist

8. 结束任务
launchctl stop com.demo.plist
```

### references

<https://ss64.com/osx/launchctl.html>
