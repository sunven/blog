# c++ run in vs code of win

## 安装编译器

### 1. 离线版

[mingw-w64](<https://sourceforge.net/projects/mingw-w64/files/Toolchains> targetting Win64/Personal Builds/mingw-builds/8.1.0/threads-posix/sjlj/x86_64-8.1.0-release-posix-sjlj-rt_v6-rev0.7z/download)

### 2. 将 bin 添加到环境变量

```
setx path "%path%;D:\mingw64\bin"
```

或手动添加环境变量

### 3.验证

```
gcc -v
```

## vs code 配置

参考 [Using Mingw-w64 in VS Code](https://code.visualstudio.com/docs/cpp/config-mingw)

## 错误

格式化时报错

```plain
Formatting failed:
"c:\Users\admin\.vscode\extensions\ms-vscode.cpptools-0.25.1/bin/../LLVM/bin/clang-format.exe" -style="file" -fallback-style="LLVM" -assume-filename="c:\Users\admin\Desktop\cppdemo\helloworld.cpp"
  Error reading c:\Users\admin\.clang-format: Invalid argument
```

删除`.clang-format`文件
