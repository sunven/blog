# python3 on mac

通过以下命令安装

```
brew install python3
```

异常：

```
Error: An unexpected error occurred during the `brew link` step
The formula built, but is not symlinked into /usr/local
Permission denied @ dir_s_mkdir - /usr/local/Frameworks
Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

解决办法：

```
sudo mkdir /usr/local/Frameworks

sudo chown $(whoami):admin /usr/local/Frameworks

brew link python3
```

vs code

```
"python.pythonPath": "/usr/local/bin/python3"
```

安装 python3 自带安装 pip3

```
pip3 -V
```

## 更换 pip 源

```
cd ~/
mkdir .pip
cd .pip
touch pip.conf
vim pip.conf
```

```
[global]

index-url = http://mirrors.aliyun.com/pypi/simple/

[install]

trusted-host=mirrors.aliyun.com
```
