# Docker

## 安装



## 镜像加速



## 常用命令



### 帮助命令

```bash
docker version     #显示docker的版本信息。
docker info        #显示docker的系统信息，包括镜像和容器的数量,更详细
docker 命令 --help  #帮助命令

#例如：方便查看语法格式，可选参数等，十分爽到
docker images --help
docker search --help
docker pull	--help
```



## 镜像命令

```bash
docker images #查看所有本地主机上的镜像
docker search #搜索镜像
docker pull   #下载镜像
docker rmi    #删除镜像
```



### 1. docker images

```bash
docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    d1165f221234   3 months ago   13.3kB

#1.解释
#REPOSITORY			# 镜像的仓库源
#TAG				    # 镜像的标签(版本)		---lastest 表示最新版本
#IMAGE ID			  # 镜像的id
#CREATED			  # 镜像的创建时间
#SIZE				    # 镜像的大小

#2.可选项（常用的2个）
Options:
  -a, --all         Show all images (default hides intermediate images) #列出所有镜像
  -q, --quiet       Only show numeric IDs # 只显示镜像的id
  
#3.示例
# docker images -a  #列出所有镜像详细信息
# docker images -aq #列出所有镜像的id
```



### 2. docker search

```bash
# docker search mysql

#1.可选参数filter
Options:
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print search using a Go template
      --limit int       Max number of search results (default 25)
      --no-trunc        Don't truncate output
# --filter=STARS=3000   #过滤，搜索出来的镜像收藏STARS数量大于3000的

#2.示例：
# docker search mysql --filter=STARS=3000
```



### 3. docker pull

```bash
# 下载镜像 docker pull 镜像名[:tag]
# 上方的tag表示的是镜像的版本，如果不加就是默认下载的最新版
# docker pull mysql
Using default tag: latest           #下载的最新版
latest: Pulling from library/mysql
69692152171a: Pull complete         #分层下载： docker image 的核心 联合文件系统
1651b0be3df3: Pull complete 
951da7386bc8: Pull complete 
0f86c95aa242: Pull complete 
37ba2d8bd4fe: Pull complete 
6d278bb05e94: Pull complete 
497efbd93a3e: Pull complete 
f7fddf10c2c2: Pull complete 
16415d159dfb: Pull complete 
0e530ffc6b73: Pull complete 
b0a4a1a77178: Pull complete 
cd90f92aa9ef: Pull complete 
Digest: sha256:d50098d7fcb25b1fcb24e2d3247cae3fc55815d64fec640dc395840f8fa80969 #签名，防伪标志
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest #真实地址

#知道真实地址：
#所以docker pull mysql等价于docker pull docker.io/library/mysql:latest
```

### 4. docker rmi

```bash
#1.首先我们查询出docker中的镜像
# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
mysql         5.7       2c9028880e58   4 weeks ago    447MB
mysql         latest    c0cdc95609f1   4 weeks ago    556MB
hello-world   latest    d1165f221234   3 months ago   13.3kB

#2.删除镜像，可以通过REPOSITORY或者IMAGE ID来删除
docker rmi -f 镜像id #删除指定id的镜像
#咱们尝试通过mysql5.7的image id来删除它
[root@iZ2vc28obhvfham8wewhh0Z ~]# docker rmi -f 2c9028880e58
Untagged: mysql:5.7
Untagged: mysql@sha256:a682e3c78fc5bd941e9db080b4796c75f69a28a8cad65677c23f7a9f18ba21fa
Deleted: sha256:2c9028880e5814e8923c278d7e2059f9066d56608a21cd3f83a01e3337bacd68
Deleted: sha256:c49c5c776f1bc87cdfff451ef39ce16a1ef45829e10203f4d9a153a6889ec15e
Deleted: sha256:8345316eca77700e62470611446529113579712a787d356e5c8656a41c244aee
Deleted: sha256:8ae51b87111404bd3e3bde4115ea2fe3fd2bb2cf67158460423c361a24df156b
Deleted: sha256:9d5afda6f6dcf8dd59aef5c02099f1d3b3b0c9ae4f2bb7a61627613e8cdfe562

#3.了解删除全部镜像的命令
docker rmi -f $(docker images -aq) #删除全部的镜像
#通过docker images -aq查询出来的所有镜像进行删除

# docker images -aq | xargs docker rmi
```

### 5. docker commit

```bash
# 命令和git原理类似
docker commit -m="描述信息" -a="作者名字" 容器id 目标镜像名:[版本TAG]
```



## 容器命令

```bash
docker run 镜像id     #新建容器并启动
docker ps             #列出所有运行的容器 docker container list
docker rm 容器id      #删除指定容器
docker start 容器id	  #启动容器
docker restart 容器id #重启容器
docker stop 容器id	  #停止当前正在运行的容器
docker kill 容器id	  #强制停止当前容器
```

### 1. 新建容器并启动

```bash
docker run [可选参数] image | docker container run [可选参数] image 
#参数说明
--name="Name"		#容器名字，比如：tomcat01 tomcat02 用来区分容器
-d					    #后台方式运行
-it 				    #使用交互方式运行，进入容器查看内容
-p					    #指定容器的端口，-p 8080(宿主机):8080(容器)
  #-p，这个是小写p。主要用法有几种：
	#1.-p	主机端口：容器端口（常用）
	#2.-p	容器端口
	#3.容器端口
	#4.-p	ip：主机端口：容器端口
-P					#大写P，随机指定端口
```

例子：

```bash
#1.使用命令运行并进入容器，通过的是bash命令
# docker run -it centos bin/bash
# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
#4.退出容器到主机
# exit
```

### 2. 列出容器

```bash
docker ps 命令  		 #列出当前正在运行的容器
  -a, --all     	   #列出当前正在运行的容器 + 历史运行过的容器
  -n=?, --last int   #列出最近创建的?个容器 ?为1则只列出最近创建的一个容器,为2则列出2个
  -q, --quiet        #只列出容器的编号
```

### 3. 退出容器

```bash
exit 		    #容器直接退出
ctrl +P +Q  #容器不停止退出 	---注意：这个很有用的操作
```

### 4. 删除容器

```bash
docker rm 容器id   				        #删除指定的容器，不能删除正在运行的容器，如果要强制删除 rm -rf
docker rm -f $(docker ps -aq)  	 #删除所有的容器，又是参数传递方式，搜出来的结果删
docker ps -a -q|xargs docker rm  #删除所有的容器
```

### 5. 后台启动容器

```bash
#1.后台运行centos
# docker run -d centos
dfec0e9a77be8a277779477dc0d5d74b2be42e182cd4cd62efa92547f6833b3a
#2.查看运行中的容器，发现没有
# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
# 问题docker ps. 发现centos 停止了
# 常见的坑，docker容器使用后台运行，就必须要有要一个前台进程，docker发现没有应用，就会自动停止。
#Docker容器后台运行，必须有一个前台进程。容器运行的命令如果不是那些一直挂起的命令（比如运行ping，sleep），就是会自动退出的。
#（这样想docker发现启动了也提供不了服务，没有东西需要它就自己关闭了，即是快速开，快速关）
# 比如nginx，容器启动后，发现自己没有提供服务，就会立刻停止自杀，就是没有程序了
```

### 6. 查看日志

```bash
#1.查看
docker logs --help
#可选项
Options:
      --details        Show extra details provided to logs 
  -f, --follow         Follow log output
      --since string   Show logs since timestamp (e.g. 2013-01-02T13:23:37) or relative (e.g. 42m for 42 minutes)
      --tail string    Number of lines to show from the end of the logs (default "all")
  -t, --timestamps     Show timestamps
      --until string   Show logs before a timestamp (e.g. 2013-01-02T13:23:37) or relative (e.g. 42m for 42 minutes)
      
# docker run -d centos /bin/sh -c "while true;do echo 6666;sleep 1;done" #模拟日志 

#2.显示日志
-tf		                         #显示日志信息（一直更新）
--tail number                  #需要显示日志条数
docker logs -t --tail n 容器id #查看n行日志
docker logs -ft 容器id         #跟着日志
```

### 7. 容器中进程信息ps

```bash
docker top 容器id
```

### 8. 查看镜像的元数据

```bash
docker inspect 容器id
```

### 9. 进入当前正在运行的容器

```bash
#我们通常容器都是使用后台方式运行的，需要进入容器，修改一些配置
#====================方式一====================
#1.命令
docker exec -it 容器id bashshell

#2.测试
#进入容器
docker exec -it 0694e2e1032c bin/bash
#进入容器之后我们想干嘛干嘛，比如使用ls命令查看东西之类
ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr

#====================方式二====================
#1.命令
docker attach 容器id
#2.测试
docker attach 0694e2e1032c
正在执行当前的代码...
#方式一和方式二的区别
#docker exec   #进入当前容器后开启一个新的终端，可以在里面操作。（常用）
#docker attach #进入容器正在执行的终端，不会启动新的进程
```

### 10 .从容器内拷贝到主机

```bash
#1.命令
docker cp 容器id:容器内路径（文件名）  主机目的路径
#2.测试
docker cp 0694e2e1032c:/hello.java /home 
#将容器内部的/hello.java移动到主机的/home目录下，即使容器关闭了，也可以拷贝出来

#拷贝是一个手动过程，未来我们使用-v卷的技术，可以实现自动同步
```



### 11. 其他

```shell
#elasticsearch非常占内存，我们可以修改配置文件，进行限制内存使用#修改配置文件 -e 环境配置修改
# 在我们之前的启动命令中加入：-e ES_JAVA_OPTS="-Xms64m -Xmx512m"，限定内存在64mb-512mb之间
docker run -d --name elasticsearch2 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2
```



## 容器数据卷

**容器的持久化和同步操作！容器间也是可以数据共享的！**



### 1. -v 挂载

```shell
#1. 语法：主要是这个-v
docker run -it -v 主机目录:容器内目录  -p 主机端口:容器内端口

#2. run一个centos容器，并使用目录挂载
# /home/ceshi：主机home目录下的ceshi文件夹  映射：centos容器中的/home
# 将容器里边的home目录挂载到linux的home下边的ceshi目录
docker run -it -v /home/ceshi:/home centos /bin/bash

#3.  docker inspect 容器id 查看是否挂载成功
[root@iZ2vc28obhvfham8wewhh0Z /]# docker inspect 54db68df3d7f
#具体看下图的Mounts部分，以后两个地址的内的数据可以相互同步的
```



### 2. mysql数据持久化

```shell
#1. 获取mysql镜像
[root@iZ2vc28obhvfham8wewhh0Z ~]# docker pull mysql:5.7

#2. 运行容器的时候需要做数据挂载，此处我们挂载了配置文件以及数据目录（有两个哦），同时咱们也配置了mysql的密码
-d 后台运行
-p 端口映射
-v 卷挂载
-e 环境配置
-- name 容器名字
[root@iZ2vc28obhvfham8wewhh0Z ~]# docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

#3. 启动成功之后，我们可以在本地去连接上服务器的mysql，如下图所示
#咱们走的是3310端口，3310端口映射了容器的3306端口，所以说我们本质还是访问到的容器
```



### 3. 具名匿名挂载

```shell
#1. 匿名挂载
-v 容器内路径!，这里我们没有写主机的路径，那么它就会自动的生成一个目录
#1-1. 使用命令匿名挂载
docker run -d -P --name nginx01 -v /etc/nginx nginx

#1-1. 查看所有volume（卷）的情况  
[root@iZ2vc28obhvfham8wewhh0Z data]# docker volume ls
DRIVER    VOLUME NAME（卷名字，这个一串乱码其实是真实存在的目录）
local     dd3decdb4e2533d16d216ba19d8797c2ad95b4a2a1b6a90f87eb98bbed3b3758
# 注：这里发现，这种就是匿名挂载，我们在 -v只写了容器内的路径，没有写容器外的路径！

#2. 具名挂载
#2-1. 使用命令具名挂载
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
# 注1:juming-nginx:/etc/nginx，给/etc/nginx命名为juming-nginx，并没有写主机地址哈
# 注2:说白了就是 -v 卷名:容器内路径

#2-2. 查看一下这个卷
[root@iZ2vc28obhvfham8wewhh0Z data]# docker volume inspect juming-nginx
[
    {
        "CreatedAt": "2021-06-25T20:18:22+08:00",
        "Driver": "local",
        "Labels": null,
        #注意看这儿：下方就是我们挂载到主机的具体路径了
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data",
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]
```



**总结**

```shell
# 三种挂载： 匿名挂载、具名挂载、指定路径挂载
-v 容器内路径			      #匿名挂载
-v 卷名：容器内路径		    #具名挂载
-v /宿主机路径：容器内路径 #指定路径挂载 docker volume ls 是查看不到的
```

**扩展**

```shell
# 通过 -v 容器内路径： ro rw 改变读写权限
ro #readonly 只读
rw #readwrite 可读可写
$ docker run -d -P --name nginx05 -v juming:/etc/nginx:ro nginx
$ docker run -d -P --name nginx05 -v juming:/etc/nginx:rw nginx

# ro 只要看到ro就说明这个路径只能通过宿主机来操作，容器内部是无法操作！
```



### 4. 数据卷容器

- 父容器：A去挂载B，那么B就是A的父容器
- 数据卷容器：被挂载的容器

```shell
docker run -it --name docker02 --volumes-from docker01 centos
```



容器之间的配置信息的传递，数据卷容器的生命周期一直持续到没有容器使用为止。

但是一旦你持久化到了本地，这个时候，本地的数据是不会删除的！



## Dockerfile

### Dockerfile指令

```shell
FROM				 # from:基础镜像，一切从这里开始构建
MAINTAINER  # maintainer:镜像是谁写的， 姓名+邮箱
RUN					# run:镜像构建的时候需要运行的命令
ADD					# add:步骤，tomcat镜像，这个tomcat压缩包！添加内容 添加同目录
WORKDIR				# workdir:镜像的工作目录
VOLUME				# volume:挂载的目录位置
EXPOSE				# expose:暴露端口配置
CMD					# cmd:指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT			# entrypoint:指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD				# onbuild:当构建一个被继承DockerFile这个时候就会运行onbuild的指令，是触发指令
COPY				# copy:类似ADD，将我们文件拷贝到镜像中
ENV					# env:构建的时候设置环境变量！
```



```shell
FROM centos
MAINTAINER tom<a@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "---end---"
CMD /bin/bash
```

```shell
docker build -f dockerfile-centos -t mycentos:0.1 .
```

### CMD与ENTRYPOINT

```shell
CMD					    # 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代。
ENTRYPOINT			# 指定这个容器启动的时候要运行的命令，可以追加命令
```



##  Docker网络

### 1. 原理

```shell
#我们发现这个容器带来网卡，都是一对对的
# veth-pair 就是一对的虚拟设备接口，他们都是成对出现的，一端连着协议，一端彼此相连
# 正因为有这个特性 veth-pair 充当一个桥梁，连接各种虚拟网络设备的
# OpenStac,Docker容器之间的连接，OVS的连接，都是使用evth-pair技术
```

> *情况一：路由器可以直接去访问容器*

![img](https://raw.githubusercontent.com/sunven/PicBed/master/20210704190642.png)

> *情况二：容器之间的访问，比如Tomcat01去访问Tomcat02，路由器就是作为一个中间商*

![img](https://raw.githubusercontent.com/sunven/PicBed/master/20210704190804.png)



```shell
#Tomcat01和Tomcat02是共用的一个路由器，docker0
#所有的容器不指定网络的情况下，都是docker0路由的，docker会给我们的容器分配一个默认的可用ip
```



Docker使用的是Linux的桥接，宿主机是一个Docker容器的网桥 docker0

![img](https://raw.githubusercontent.com/sunven/PicBed/master/20210704190858.png)



### 2. --link

本质就是在hosts配置中添加映射，现在使用Docker已经不建议使用–-link了！

###  3. 自定义网络

**网络模式：**

- **bridge ：桥接 docker（默认，自己创建也是用bridge模式）**
- none ：不配置网络，一般不用
- host ：和宿主机共享网络
- container ：容器网络连通（用得少！局限很大）



```shell
# 我们直接启动的命令 --net bridge,而这个就是我们的docker0
# bridge就是docker0
#"--net bridge"就是默认参数
docker run -d -P --name tomcat01 tomcat
docker run -d -P --name tomcat01 --net bridge tomcat
#------------------------------------------------------
#------------------------------------------------------

#自定义网络：

#1. 清理环境，删除之前的容器
docker rm -f  $(docker ps -aq)

#2. 创建一个子网为“192.168.0.0/16”，网关（路由）为“192.168.0.1”，网络名字为“mynet”的网络
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet

#3. 查看创建的网络
docker network ls

#4. 创建两个个tomcat使用我们自定义的网络
docker run -d -P --name tomcat-net-01 --net mynet tomcat
docker run -d -P --name tomcat-net-02 --net mynet tomcat

#5. 然后查看我们自定义的网络，如下图所示
docker network inspect 56505443b59d

#6. 我们再来ping容器
docker exec -it tomcat-net-01 ping tomcat-net-02
docker exec -it tomcat-net-01 ping 192.168.0.3
```



### 4. 网络联通

![img](https://raw.githubusercontent.com/sunven/PicBed/master/20210704191318.png)

```shell
#语法：docker network connect [OPTIONS] NETWORK CONTAINER
#1. 之前删除的tomcat01和tomcat02创建好
docker run -d -P --name tomcat01 tomcat
docker run -d -P --name tomcat02 tomcat

#2. 打通tomcat01和mynet
docker network connect mynet tomcat01

#3. 查看网络配置，如下图所示：
docker network inspect mynet
# 要将tomcat01 连通 tomcat—net-01 ，连通就是将 tomcat01加到 mynet网络
# 一个容器两个ip（tomcat01）

#4. 现在我们再ping一下
[root@iZ2vc28obhvfham8wewhh0Z ~]# docker exec -it tomcat01 ping tomcat-net-02
```



### 5.测试

```shell
#1. 先移除之前的容器
docker rm -f $(docker ps -aq)

#2. 创建redis的网卡
docker network create redis --subnet 172.38.0.0/16

#3. 通过脚本去写配置文件
for port in $(seq 1 6);\
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >> /mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done

#4. 通过脚本创建六个redis文件
for port in $(seq 1 6);\
docker run -p 637${port}:6379 -p 1637${port}:16379 --name redis-${port} \
-v /mydata/redis/node-${port}/data:/data \
-v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.1${port} redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf; \
#5. 然后依次运行
docker exec -it redis-1 /bin/sh 
docker exec -it redis-2 /bin/sh 
docker exec -it redis-3 /bin/sh 
docker exec -it redis-4 /bin/sh 
docker exec -it redis-5 /bin/sh 
docker exec -it redis-6 /bin/sh 

#6. 创建集群
redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379  --cluster-replicas 1
```



## Docker Compose

定义运行多个容器



地址：https://docs.docker.com/compose/gettingstarted/



https://docs.docker.com/compose/wordpress/



```shell
docker-compose down         # 关闭容器
docker-compose up --build   # 重新构建
docker-compose up -d
```



## Docker Swarm

4台机器，xshell同步操作



![img](https://docs.docker.com/engine/swarm/images/swarm-diagram.png)

### Manager nodes

使用[Raft](https://raft.github.io/raft.pdf)实现，管理者保持整个群和所有运行在它的服务的一致内部状态

- 管理集群状态
- 调度

可故障的管理节点数:(N-1)/2

3个最多可以有一个故障

5个最多可以有两个故障

一个几圈最多简易有7个管理节点



增加更多的管理者并不意味着可扩展性或更高的性能。一般来说，情况正好相反

### Worker nodes

- 执行容器



### 命令

初始化

```shell
docker swarm init --help
 
ip addr # 获取自己的ip（用内网的不要流量）
 
docker swarm init --advertise-addr 172.16.250.97
Swarm initialized: current node (otdyxbk2ffbogdqq1kigysj1d) is now a manager.
To add a worker to this swarm, run the following command:
    docker swarm join --token SWMTKN-1-3vovnwb5pkkno2i3u2a42yrxc1dk51zxvto5hrm4asgn37syfn-0xkrprkuyyhrx7cidg381pdir 172.16.250.97:2377
To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```



```shell
# 获取令牌
docker swarm join-token manager
docker swarm join-token worker

# 加入swarm
docker swarm join --token SWMTKN-1-3vovnwb5pkkno2i3u2a42yrxc1dk51zxvto5hrm4asgn37syfn-0xkrprkuyyhrx7cidg381pdir 172.16.250.97:2377

# 离开swarm
docker swarm leave
```



```shell
docker run     # 容器启动！ 不具有扩缩容器
docker service # 服务！ 具有扩缩容器，滚动更新！
```



```shell
# 查看服务列表
docker service ls

# 查看服务信息
docker service ps servicename

# 扩缩容
docker service update --replicas 3 my-nginx
docker service scale my-nginx=5

# 移除
docker service rm
```



### service如何工作

![services diagram](https://docs.docker.com/engine/swarm/images/services-diagram.png)

### 任务和调度

![services flow](https://docs.docker.com/engine/swarm/images/service-lifecycle.png)

### 副本和服务

![global vs replicated services](https://docs.docker.com/engine/swarm/images/replicated-vs-global.png)

##  reference

[狂神Docker学习笔记_Lemonyuki的博客-CSDN博客](https://blog.csdn.net/GTX_WU/article/details/118370049)

[Docker入门学习笔记(21h/2d 4.14-16) (u19900101.github.io)](https://u19900101.github.io/2021-04-16-Docker入门学习笔记_21h2d/)

