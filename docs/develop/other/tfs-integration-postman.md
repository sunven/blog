# TFS 集成 Postman

配置在TFS的【生成】中，有两种方案

## Newman the cli Companion for Postman

用tsf的扩展实现

### 每一次都安装Newman

![image](http://qiniu.llweb.top/Snipaste_20181219113619201812191136263588.png)

> tfs中使用的install和外面的不一样，tfs有特有的windows用户去跑。

### Newman配置

![image](http://qiniu.llweb.top/Snipaste_20181219113932201812191139490737.png)

主要是配置postman的脚本路径

### 测试结果

![image](http://qiniu.llweb.top/Snipaste_20181219114135201812191141432211.png)

跑完后出可视化测试报告

### 示例

控制台

![image](http://qiniu.llweb.top/Snipaste_20181219115404201812191154134402.png)

报告

![image](http://qiniu.llweb.top/Snipaste_20181219115839201812191158454877.png)

用Newman the cli Companion for Postman跑完collection后有一个错误：`C:\Windows\ServiceProfiles\NetworkService\AppData\Roaming\npm\newman.cmd failed with return code: 1`

在Newman配置中，勾上出错时继续

![image](http://qiniu.llweb.top/Snipaste_20181219122249201812191223208829.png)

## Gulp

用gulp任务实现，Gulp是tfs里面有的功能

### 安装依赖

![image](http://qiniu.llweb.top/Snipaste_20181219115008201812191150189293.png)

package.json如下：

```json
{
  "name": "postman",
  "version": "1.0.0",
  "description": "",
  "main": "gulpfile.js",
  "dependencies": {
    "gulp": "^3.9.1",
    "newman": "^4.1.0",
    "newman-reporter-html": "^1.0.2"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### Gulp配置

![image](http://qiniu.llweb.top/Snipaste_20181219122512201812191225181735.png)

gulpfile.js如下：

```js
var gulp = require('gulp');
var fs = require('fs');

gulp.task('default', function () {
    const newman = require('newman');

    var collectionFile = '';
    var environmentFile = '';
    const files = fs.readdirSync(__dirname)
    files.forEach(function (item, index) {
        if (item.lastIndexOf('postman_collection.json') != -1) {
            collectionFile = item;
        }
        if (item.lastIndexOf('postman_environment.json') != -1) {
            environmentFile = item;
        }
    })
    newman.run({
        collection: collectionFile,
        environment: environmentFile,
        reporters: ['cli', 'junit']
    }, function (err) {
        if (err) {
            throw err;
        }
        console.log('collection run complete!');
    });
});
```

### 示例

控制台

![image](http://qiniu.llweb.top/Snipaste_20181219123236201812191232409849.png)

报告如上