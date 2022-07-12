# 在 shell 脚本中利用 lftp 做自动部署

[LFTP](https://lftp.yar.ru/)

## mac os

新建`deploy.sh`

```shell
#!/bin/bash

#SFTP配置信息
#用户名
USER=******
#密码
PASSWORD=******
#待上传文件根目录
SRCDIR=./docs/.vitepress/dist
#FTP目录
DESDIR=/home/llweb.top
#IP
IP=******

# 连不上
# lftp -e "mirror -R ${SRCDIR} ${DESDIR}" -u ${USER},${PASSWORD} sftp://${IP}

lftp -u ${USER},${PASSWORD} sftp://${IP} <<EOF
# rm -rf /home/llweb.top
mirror -R --delete --ignore-time --only-newer --exclude-glob *.html --verbose --use-pget-n=8 -p -c ${SRCDIR} ${DESDIR}
mirror -R --delete --only-newer --include-glob *.html --verbose --use-pget-n=8 -p -c ${SRCDIR} ${DESDIR}
by
EOF
```

执行`sh deploy.sh`

## windows

下载[LFTP for Windows](https://nwgat.ninja/lftp-for-windows/)

解压后将`bin`目录加入环境变量

新建`windowsdeploy.lftp`

```
set sftp:auto-confirm "yes"
open sftp://username:pwd@site
# rm -rf /home/llweb.top
mirror -R --delete --ignore-time --only-newer --exclude-glob *.html --verbose --use-pget-n=8 -p -c ./docs/.vitepress/dist /home/llweb.top
mirror -R --delete --only-newer --include-glob *.html --verbose --use-pget-n=8 -p -c ./docs/.vitepress/dist /home/llweb.top
# chmod 644 /home/llweb.top/*
```

执行`lftp.exe -f windowsdeploy.lftp`
