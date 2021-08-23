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
- `open /usr/local/bin`：用finder打开目录
- `open -a typora /Users/seven/project/blog/docs`:用typora打开

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

zsh终端下：

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
- 更新Homebrew，如：brew update
