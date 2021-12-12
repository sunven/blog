# mysql on docker

```
docker pull mysql

docker run --name pwc-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql
或
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=Password -e MYSQL_DATABASE=Caad.Dispatcher -e MY
SQL_USER=dispatcheruser -e MYSQL_PASSWORD=dispatcherpwd -p 3306:3306 -d mysql

sudo docker exec -it mysql bash
```

## reference

[http://note.youdao.com/groupshare/?token=A99AE30E33FD44039EC7096059654A47&gid=7937677](http://note.youdao.com/groupshare/?token=A99AE30E33FD44039EC7096059654A47&gid=7937677)
