# vue中的发布/订阅模式模式

Vue会遍历实例的data属性，把每一个data都设置为访问器，然后在该属性的getter函数中将其设为watcher，在setter中向其他watcher发布改变的消息。

这样，配合发布/订阅模式，改变其中的一个值，会发布消息，所有的watcher会更新自己，这些watcher也就是绑定在dom中的显示信息



```javascript
//遍历传入实例的data对象的属性，将其设置为Vue对象的访问器属性
function observe(obj, vm) {
  Object.keys(obj).forEach(function(key) {
    defineReactive(vm, key, obj[key]);
  });
}
//设置为访问器属性，并在其getter和setter函数中，使用订阅发布模式。互相监听。
function defineReactive(obj, key, val) {
  //这里用到了观察者(订阅/发布)模式,它定义了一种一对多的关系，让多个观察者监听一个主题对象，这个主题对象的状态发生改变时会通知所有观察者对象，观察者对象就可以更新自己的状态。
  //实例化一个主题对象，对象中有空的观察者列表
  var dep = new Dep();
  //将data的每一个属性都设置为Vue对象的访问器属性，属性名和data中相同
  //所以每次修改Vue.data的时候，都会调用下边的get和set方法。然后会监听v-model的input事件，当改变了input的值，就相应的改变Vue.data的数据，然后触发这里的set方法
  Object.defineProperty(obj, key, {
    get: function() {
      //Dep.target指针指向watcher，增加订阅者watcher到主体对象Dep
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      //console.log(val);
      //给订阅者列表中的watchers发出通知
      dep.notify();
    }
  });
}

//主题对象Dep构造函数
function Dep() {
  this.subs = [];
}
//Dep有两个方法，增加订阅者  和  发布消息
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  }
};
```

参考：

https://www.cnblogs.com/leaf930814/p/9014200.html



## mvvm监测数据变化



1. 利用Object.defineProperty检测数据变化
2. 解决数组的'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'方法

1. 修改字段的路径

```javascript
/*
 *  Object 原型
 */
const OP = Object.prototype;
/*
 *  需要重写的数组方法 OAR 是 overrideArrayMethod 的缩写
 */
const OAM = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

export class Jsonob {
    constructor(obj, callback) {
        if (OP.toString.call(obj) !== '[object Object]') {
            console.error('This parameter must be an object：' + obj);
        }
        this.$callback = callback;
        this.observe(obj);
    }

    /**
     * 监测数据对象
     * @param   {Object}  obj    [要监测的数据对象]
     * @param   {Array}   path   [属性路径]
     */
    observe(obj, path) {
        if (OP.toString.call(obj) === '[object Array]') {
            this.overrideArrayProto(obj, path);
        }
        Object.keys(obj).forEach(function (key, index, keyArray) {
            var oldVal = obj[key];
            var pathArray = path && path.slice(0);
            if (pathArray) {
                pathArray.push(key);
            } else {
                pathArray = [key];
            }

            Object.defineProperty(obj, key, {
                get: function () {
                    return oldVal;
                },
                set: (function (newVal) {
                    if (oldVal !== newVal) {
                        if (OP.toString.call(newVal) === '[object Object]' || OP.toString.call(newVal) === '[object Array]') {
                            this.observe(newVal, pathArray);
                        }
                        this.$callback(newVal, oldVal, pathArray);
                        oldVal = newVal;
                    }

                }).bind(this)
            });

            if (OP.toString.call(obj[key]) === '[object Object]' || OP.toString.call(obj[key]) === '[object Array]') {
                this.observe(obj[key], pathArray);
            }

        }, this);

    }

    /**
     * 重写数组的方法
     * @param   {Array}   array     [数组字段]
     * @param   {Array}   path      [属性路径]
     */
    overrideArrayProto(array, path) {
        var originalProto = Array.prototype,
            overrideProto = Object.create(Array.prototype),
            self = this,
            result;

        Object.keys(OAM).forEach(function (key, index, array) {
            var method = OAM[index],
                oldArray = [];

            Object.defineProperty(overrideProto, method, {
                value: function () {
                    oldArray = this.slice(0);

                    var arg = [].slice.apply(arguments);
                    result = originalProto[method].apply(this, arg);

                    self.observe(this, path);
                    self.$callback(this, oldArray, path);

                    return result;
                },
                writable: true,
                enumerable: false,
                configurable: true
            });
        }, this);

        array.__proto__ = overrideProto;

    }
}
```

参考：

[http://hcysun.me/2016/04/28/JavaScript%E5%AE%9E%E7%8E%B0MVVM%E4%B9%8B%E6%88%91%E5%B0%B1%E6%98%AF%E6%83%B3%E7%9B%91%E6%B5%8B%E4%B8%80%E4%B8%AA%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%8F%98%E5%8C%96/](http://hcysun.me/2016/04/28/JavaScript实现MVVM之我就是想监测一个普通对象的变化/)