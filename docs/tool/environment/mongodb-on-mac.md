# mongodb on mac

## 下载

https://www.mongodb.com/try/download/community

## 安装

```bash
# 1. 解压安装包：
tar -zxvf mongodb-macos-x86_64-4.4.3.tgz 
# 2. 将解压后的文件放到指定路径： 
mv mongodb-macos-x86_64-4.4.3 /usr/local/mongodb
# 3. 创建数据存放路径
mkdir -p /usr/local/var/mongodb
# 4. 创建日志文件存放路径
mkdir -p /usr/local/var/log/mongodb
# 5. 创建配置文件
touch /usr/local/etc/mongod.conf
```

## 环境变量

```bash
export PATH=/usr/local/mongodb/bin:$PATH
```

## 配置文件

```bash
# 数据库文件位置
dbpath=/usr/local/var/mongodb
# 日志文件路径
logpath=/usr/local/var/log/mongodb/mongo.log
# 进程ID，没有指定则启动时候就没有PID文件。默认缺省
pidfilepath=/usr/local/var/log/mongodb/master.pid
# 修改数据目录存储模式，每个数据库的文件存储在DBPATH指定目录的不同的文件夹中。使用此选项，可以配置的MongoDB将数据存储在>不同的磁盘设备上，以提高写入吞吐量或磁盘容量。默认为false。
directoryperdb=true
# 写日志的模式：设置为true为追加。默认是覆盖
# logappend=true
# 绑定地址
bind_ip=127.0.0.1
# 端口号
port=27017
# 是否后台运行，设置为true 启动 进程在后台运行的守护进程模式。默认false
fork=true
```

## 启动

```bash
mongod --config /usr/local/etc/mongod.conf
```

## 可视化工具

https://studio3t.com/