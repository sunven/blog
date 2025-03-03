# Ubuntu 常用命令

## 通用

```
查看版本：cat /etc/issue
lsb_release -c
lsb_release -a
查看服务状态：
ps -e|grep ssh
sudo service ssh status

进程：
ps aux | grep dotnet
kill 1234
nohup dotnet Api.dll &
ps -ef|grep "your_command" #（查找运行该命令的进程）
ps -ef|grep "dotnet Api.dll" #
kill -9 your_command_pid #(根据进程号关闭程序)

df -hl(查看文件系统)
```

## IP、端口

```
查勘所有
netstat -ntlp

查看80
netstat -ntulp |grep 80
```

## 更换Ubuntu apt-get源

> Ubuntu 版本不一样，源地址也不同
> <https://developer.aliyun.com/mirror/ubuntu>

1、原文件备份

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

2、编辑源列表文件

```
sudo vim /etc/apt/sources.list
```

3、将原来的列表删除，添加如下内容

```
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
```

4、运行sudo apt-get update

## ssl

1、更新

```
sudo apt-get update
```

2、安装

```
sudo apt-get install openssh-server
```

3、检查服务状态

- 使用账号密码登录

```
sudo vim /etc/ssh/sshd_config
```

PasswordAuthentication改为yes

- 出现“Could not load host key: /etc/ssh/ssh_host_rsa_key“等

```
sudo ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
sudo ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
```

## ftp

1、准备目录、用户

```
mkdir /home/ftp
cd /home
chmod 777 ftp

sudo useradd -d /home/ftp -s /bin/bash ftpuser
```

2、更新

```
sudo apt-get update
```

3、安装

```
sudo apt-get install vsftpd
```

4、修改vsftpd.conf

```
sudo vi /etc/vsftpd.conf
```

```
local_enable=YES
write_enable=YES
```

5、重启

```
sudo /etc/init.d/vsftpd restart
```

> 如果是阿里云等服务器，还需要开放端口

## 升级 Ubuntu

```
sudo  apt-get   update
```

```
sudo  apt-get  upgrade
```

```
sudo  update-manager   -c  -d
```

自动登录

```sh
#!/usr/bin/expect -f
set timeout -1
spawn ssh root@100.65.38.26
expect "*assword:*"
send "Teng0606its!@#\n"
interact

```

从本机拷贝到另外一台机器

```sh
#!/usr/bin/expect
set timeout -1
#从本机拷贝到另外一台机器
spawn scp -r /mnt/f/work/tldp/front-end/build/* root@100.65.38.26:/www/tldp
expect {
 "(yes/no)?" {
   send "yes\n"
   expect "*assword:*" { send "Teng0606its1!@#\n"}
  }
  "*assword:*" {
   send "Teng0606its1!@#\n"
  }
}
expect eof
```

复制

``` sh
cp -r ./tldp ./tldp_0706_bak
```

设置代理 .zhsrc

```
export http_proxy="http://192.168.64.1:1080"
export https_proxy="http://192.168.64.1:1080"
```

代理（ss）开启 允许局域网的连接

host raw.githubusercontent.com

1. 替换源 :%s/old/new/g
2. 安装zsh
3. 默认用zsh
chsh -s /bin/zsh
chsh -s $(which zsh)
重新打开终端

## on-my-zsh

主题：

<https://github.com/romkatv/powerlevel10k>

插件：

<https://github.com/zsh-users/zsh-syntax-highlighting>

<https://github.com/zsh-users/zsh-autosuggestions>

```sh
# 下载
curl -o test.sh https://example.com/test.sh
# 授权
chmod +x test.sh
# 执行
./test.sh

# 合成一个命令 管道符
curl https://example.com/test.sh | sh
```
