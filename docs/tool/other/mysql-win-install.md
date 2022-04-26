
# mysql（解压缩版）在windows下的安装

## 环境变量

1. 新增系统环境变量 键名：`MYSQL_HOME` 值为：`D:\MySQL\MySQL Server 5.7.22`
2. 环境变量`Path`中增加：`%MYSQL_HOME%\bin`

## 新建my.ini文件

内容如下：

``` sh
[mysqld]

port = 3306

basedir=D:\MySQL\MySQL Server 5.7.22

datadir=D:\MySQL\MySQL Server 5.7.22\data

max_connections=200

character-set-server=utf8

default-storage-engine=INNODB

sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

[mysql]

default-character-set=utf8
```

## 安装

进 `D:\MySQL\MySQL Server 5.7.22\bin`目录

1. 运行命令：`mysqld  --initialize` (此时会生成data目录)
2. 运行`mysqld -install` （安装）
3. 运行`net start mysql` (启动mysql服务)

## 设置root账户密码

1. 在`my.ini`文件的`[mysqld]`下加一行`skip-grant-tables`保存后再重启MySQL服务
2. 运行`mysql -uroot -p`可以成功登入mysql（密码随便输）
3. 执行`update mysql.user set authentication_string=password("root") where user="root";`将root密码改为root
4. 执行`flush privileges;`（刷新账户信息）
5. 执行`exit`退出
6. 将`my.ini`文件中刚才加的`skip-grant-tables`这一行删掉，保存后再重启MySQL服务
7. 运行`mysql -uroot -proot`就可以用root用户名和root密码登陆了

## 问题

> You must reset your password using ALTER USER statement before executing this statement

1. `SET PASSWORD = PASSWORD('your new password');`

2. `ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;`

3. `flush privileges;`

> Column length too big for column 'JobArgs' (max = 21845); use BLOB or TEXT instead



## ubuntu

查看有没有安装MySQL：

`dpkg -l | grep mysql`

安装MySQL：

`apt-get install mysql-server`

初始化

mysql_secure_installation

允许远程访问

vim /etc/mysql/mysql.conf.d/mysqld.cnf

注释掉bind-address     = 127.0.0.1

mysql -u root -p

mysql> grant all on *.* to root@'%' identified by '你的密码' with grant option;

mysql> flush privileges;  # 刷新权限

mysql> exit

重启

systemctl restart mysql

### ower_case_table_names

`lower_case_table_names` 是mysql设置大小写是否敏感的一个参数。

`lower_case_table_names = 0` 表名存储为给定的大小和比较是区分大小写的
`lower_case_table_names = 1` 表名存储在磁盘是小写的，但是比较的时候是不区分大小写
`lower_case_table_names = 2` 表名存储为给定的大小写但是比较的时候是小写的

- unix,linux下lower_case_table_names默认值为 0

- Windows下默认值是 1

- Mac OS X下默认值是 2

**启动mysql：**
方式一：`sudo /etc/init.d/mysql start`
方式二：`sudo start mysql`
方式三：`sudo service mysql start`

**停止mysql：**
方式一：`sudo /etc/init.d/mysql stop`
方式二：`sudo stop mysql`
方式san：`sudo service mysql stop`

**重启mysql：**
方式一：`sudo/etc/init.d/mysql restart`
方式二：`sudo restart mysql`
方式三：`sudo service mysql restart`
