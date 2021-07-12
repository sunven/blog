
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
