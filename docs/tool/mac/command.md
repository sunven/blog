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
