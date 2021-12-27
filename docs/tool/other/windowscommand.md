# windows 命令

查看占用端口

`netstat -ano | findstr 3306`

查看 PID 对应的进程

`tasklist|findstr "12448"`

## 环境变量

```sh
## 列出所有环境变量
ls env:
## 读取某个环境变量
$env:windir
## 设置某个环境变量
$env:TestVar1="This is my environment variable"
## 删除某个环境变量
del env:windir
```
