# 《JavaScript设计模式》行为型设计模式

## 模板方法模式

父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类中，使得子类可以不改变父类的算法结构的同时可重新定义算法中的某些实现步骤

```js
var Alert = function(data) {
  //如果没有数据则返回，防止后面程序执行
  if (!data) return;
  //设置内容
  this.content = data.content;
  //创建提示框面板
  this.panel = document.createElement("div");
  //创建提示内容组件
  this.contentNode = document.createElement("p");
  //创建确定按钮组件
  this.confirmBtn = document.createElement("span");
  //创建关闭按钮组件
  this.closeBtn = document.createElement("b");
  //为提示框面板添加类
  this.panel.className = "alert";
  //为关闭按钮添加类
  this.closeBtn.className = "a-close";
  //为确定按钮添加类
  this.confirmBtn.className = "a-confirm button blue";
  //为确认按钮添加显示名称
  this.confirmBtn.innerHTML = data.confirm || "确定";
  //为提示内容添加文本
  this.contentNode.innerHTML = this.content;
  //为点击确定方法绑定执行方法
  this.success = data.success || function() {};
  //点击关闭按钮执行方法
  this.fail = data.fail || function() {};
};

Alert.prototype = {
  //初始化方法
  init: function() {
    //生成提示框
    this.panel.appendChild(this.closeBtn);
    this.panel.appendChild(this.contentNode);
    this.panel.appendChild(this.confirmBtn);
    //插入页面
    document.body.appendChild(this.panel);
    //绑定事件
    this.bindEvent();
    //显示提示框
    this.show();
  },
  bindEvent: function() {
    var me = this;
    //关闭按钮事件
    this.closeBtn.onclick = function() {
      //执行关闭取消方法
      me.fail();
      //隐藏弹层
      me.hide();
    };
    //确定按钮事件
    this.confirmBtn.onclick = function() {
      //执行关闭确认方法
      me.success();
      //隐藏弹层
      me.hide();
    };
  },
  hide: function() {
    this.panel.style.display = "none";
  },
  show: function() {
    this.panel.style.display = "block";
  }
};

var TitleAlert = function(data) {
  //继承基本提示框
  Alert.call(this, data);
  //设置标题内容
  this.title = data.title;
  //创建标题组件
  this.titleNode = document.createElement("h3");
  //标题组件中写入标题内容
  this.titleNode.innerHTML = this.title;
};
//继承基本提示框方法
TitleAlert.prototype = new Alert();
//对基本提示框创建方法拓展
TitleAlert.prototype.init = function() {
  //插入标题
  this.panel.insertBefore(this.titleNode, this.panel.firstChild);
  //继承基本提示框init方法
  Alert.prototype.init.call(this);
};

new TitleAlert({
  title: "提示标题",
  content: "提示内容",
  success: function() {
    alert("您点击了确定");
  }
}).init();
```

## 观察者模式

定义了一种依赖关系，解决了主题对象与观察者之间功能的耦合

```js
var Observer = (function() {
  //为了防止消息队列暴露而被篡改，我们将消息容器设置为静态私有变量
  var _messages = {};
  return {
    //注册信息接口
    regist: function(type, fn) {
      //如果此消息不存在我们创建一个该消息类型
      if (typeof _messages[type] === "undefined") {
        //将动作推入到该消息对应的动作执行队列中
        _messages[type] = [fn];
      } else {
        //如果此消息存在，我们将动作方法推入该消息对应的动作执行序列中
        _messages[type].push(fn);
      }
    },
    //发布信息接口
    fire: function(type, args) {
      //如果该消息没被注册则返回
      if (!_messages[type]) return;
      //定义消息信息
      var events = {
          type: type, //消息类型
          args: args || {} //消息携带数据
        },
        i = 0,
        len = _messages[type].length;
      //遍历消息动作
      for (var i = 0; i < _messages[type].length; i++) {
        //一次执行注册的消息对应的动作序列
        _messages[type][i].call(this, events);
      }
    },
    //移除信息接口
    remove: function(type, fn) {
      //如果消息动作队列对象存在
      if (_messages[type] instanceof Array) {
        //从最后一个消息动作遍历
        for (var i = _messages[type].length - 1; i >= 0; i--) {
          //如果存在该动作真在消息动作序列中移除相应动作
          _messages[type][i] === fn && _messages[type].splice(i, 1);
        }
      }
    }
  };
})();

Observer.regist("test", function(e) {
  console.log(e.type, e.args.msg);
});
Observer.fire("test", { msg: "传递参数" });
```

## 状态模式

- 当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象
- 主要目的就是将条件判断的不同结果转化为状态对象的内部状态

```js
function show(value) {
  if (value == 0) {
    console.log(0);
  } else if (value == 1) {
    console.log(1);
  } else if (value == 2) {
    console.log(2);
  }
}

//返回状态结果对象
var ResutlState = (function() {
  //把结果保存在内部对象中
  var States = {
    //每种状态作为一种独立的方法保存
    state0: function() {
      console.log(0);
    },
    state1: function() {
      console.log(1);
    },
    state2: function() {
      console.log(2);
    }
  };
  //获取对应方法
  function show(result) {
    States["state" + result] && States["state" + result]();
  }
  return {
    //返回调用状态方法
    show: show
  };
})();

ResutlState.show(1);
```

## 策略模式

- 将一组算法封装起来，使其可以互相替换
- 与状态模式相比：不需要管理状态，状态之间没有依赖

```js
//表单正则验证策略对象
var checkInput = (function() {
  var stragtegy = {
    //判断是否为空
    notNull: function(value) {
      return /\s/.test(value) ? "请输入内容" : "";
    },
    //判断是否为一个数字
    number: function(value) {
      return /^[0-9]+(\.[0-9]+)?$/.test(value) ? "" : "请输入数字";
    }
  };
  return {
    //验证接口
    check: function(type, value) {
      value = value.replace(/^\s+|\s+$/g, "");
      return stragtegy[type]
        ? stragtegy[type](value)
        : "没有该类型的检测方法";
    },
    //添加策略
    addStrategy: function(type, fn) {
      stragtegy[type] = fn;
    }
  };
})();

console.log(checkInput.check("number", "a"));
console.log(checkInput.check("number", "0"));
checkInput.addStrategy("phone", function(value) {
  return /^\d{3}\-\d{8}$|^\d{4}-\d{7}$/.test(value)
    ? ""
    : "请输入正确的电话号码";
});
console.log(checkInput.check("phone", "12345678"));
console.log(checkInput.check("phone", "027-12345678"));
```

## 职责链模式

解决请求发送者与请求的接受者之间的耦合，通过职责链上的多个对象分解请求流程，实现请求在多个对象之间传递，直到最后一个对象完成请求

```js
//请求模块
var sendData = function(data, dealType, dom) {
  var xhr = new XMLHttpRequest();
  var url = "getData.php?mod=userInfo";
  xhr.onload = function(event) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      dealData(xhr.responseText, dealType, dom);
    } else {
      //                请求失败
    }
    //拼接请求字符串
    for (var i in data) {
      url += "&" + i + "=" + data[i];
    }
    //发送请求
    xhr.open("get", url, true);
    xhr.send(null);
  };
};
//响应数据适配模块
var dealData = function(data, dealType, dom) {
  var dealType = Object.prototype.toString.call(data);
  //判断相应的数据处理对象
  switch (dealType) {
    case "sug":
      if (dealType === "[object Array]") {
        return createSug(data, dom);
      }
      if (dealType === "[object Object]") {
        var newData = [];
        for (var i in data) {
          newData.push(data[i]);
        }
        return createSug(newData, dom);
      }
      return createSug([data], dom);
      break;
    case "validata":
      return createValidataResult(data, dom);
      break;
  }
};
//创建组件模块
//提示框组件
var createSug = function(data, dom) {
  var i = 0,
    len = data.length;
  html = "";
  for (; i < len; i++) {
    html += "<li>" + data[i] + "</li>";
  }
  dom.parentNode.getElementsByTagName("ul")[0].innerHTML = html;
};
//校验组件
var createValidataResult = function(data, dom) {
  dom.parentNode.getElementsByTagName("span")[0].innerHTML = data;
};

// 模拟数据
var _inputs = document.getElementsByTagName("input");
dealData("用户名不正确", "validate", _inputs[0]);
dealData(123, "sug", _inputs[1]);
dealData(["爱奇艺", "阿里巴巴", "爱漫画"], "sug", _inputs[1]);
dealData(
  {
    iqy: "爱奇艺",
    albb: "阿里巴巴",
    imh: "爱漫画"
  },
  "sug",
  _inputs[1]
);

var createSug = function(data, dom) {
  console.log(data, dom, "createSug");
};
var createValidateResult = function(data, dom) {
  console.log(data, dom, "createValidateResult");
};

// 事件
_inputs[0].onchange = function(e) {
  console.log("触发了onchange事件");
  sendData({ value: _inputs[0].value }, "validate", _inputs[0]);
};
_inputs[1].onkeydown = function(e) {
  console.log("触发了onkeydown事件");
  sendData({ value: _inputs[1].value }, "sug", _inputs[1]);
};
```

## 命令模式

将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化

```js
//实现对象
var CanvasCommand = (function() {
  //获取canvas
  var canvas = document.getElementById("canvas"),
    //canvas元素的上下文引用对象缓存在命令对象的内部
    ctx = canvas.getContext("2d");
  //内部方法对象
  var Action = {
    //填充色彩
    fillStyle: function(c) {
      ctx.fillStyle = c;
    },
    //填充矩形
    fillRect: function(x, y, width, height) {
      ctx.fillRect(x, y, width, height);
    },
    //描边色彩
    strokeStyle: function(c) {
      ctx.strokeStyle = c;
    },
    //描边矩形
    strikeRect: function(x, y, width, height) {
      ctx.strokeRect(x, y, width, height);
    },
    //填充字体
    fillText: function(text, x, y) {
      ctx.fillText(text, x, y);
    },

    //开启路径
    beginPath: function() {
      ctx.beginPath();
    },
    //移动画笔触点
    moveTo: function(x, y) {
      ctx.moveTo(x, y);
    },
    //画笔连线
    lineTo: function(x, y) {
      ctx.lineTo(x, y);
    },
    //绘制弧线
    arc: function(x, y, r, begin, end, dir) {
      ctx.arc(x, y, r, begin, end, dir);
    },
    //填充
    fill: function() {
      ctx.fill();
    },
    //描边
    stroke: function() {
      ctx.stroke();
    }
  };
  return {
    //命令接口
    excute: function(msg) {
      //如果没有命令直接返回
      if (!msg) {
        return;
      }
      //如果命令是一个数组，遍历执行多个命令
      if (msg.length) {
        for (var i = 0; i < msg.length; i++) arguments.callee(msg[i]);
      } else {
        //执行一个命令
        msg.param =
          Object.prototype.toString.call(msg.param) === "[object Array]"
            ? msg.param
            : [msg.param];
        Action[msg.command].apply(Action, msg.param);
      }
    }
  };
})();

CanvasCommand.excute([
  { command: "fillStyle", param: "red" },
  { command: "fillRect", param: [20, 20, 250, 150] }
]);
```

## 访问者模式

- 针对于对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法
- 解决数据与数据操作方法之间的耦合，将数据的操作方法独立于数据

```js
//创建访问器
var Visitor = (function() {
  return {
    //截取方法
    splice: function() {
      var args = Array.prototype.splice.call(arguments, 1);
      return Array.prototype.splice.apply(arguments[0], args);
    },
    //追加数据方法
    push: function() {
      var len = arguments[0].length || 0;
      var args = this.splice(arguments, 1);
      arguments[0].length = len + arguments.length - 1;
      return Array.prototype.push.apply(arguments[0], args);
    },
    //删除最后一次添加成员
    pop: function() {
      return Array.prototype.pop.apply(arguments[0]);
    }
  };
})();

var a = new Object();
console.log(a.length);
Visitor.push(a, 1, 2, 3, 4);
console.log(a.length);
Visitor.push(a, 4, 5, 6);
console.log(a);
console.log(a.length);
Visitor.pop(a);
console.log(a);
console.log(a.length);
Visitor.splice(a, 2);
console.log(a);
```

## 中介者模式

- 通过中介者对象封装一系列对象之间的交互，是对象之间不再相互引用，降低他们之间的耦合
- 观察者中的订阅者是双向的，既可以是发布者，也可以是订阅者
- 中介者模式中是单向的，只能是订阅者，消息统一由中介者对象发布，所有订阅者简接的被中介者管理

```js
//中介者对象
var Mediator = (function() {
  //消息对象
  var _msg = {};
  return {
    //订阅方法
    register: function(type, action) {
      //如果存在该消息
      if (_msg[type]) {
        //存入回调函数
        _msg[type].push(action);
      } else {
        //不存在我们建立消息容器
        _msg[type] = [];
        //存入新消息回调函数
        _msg[type].push(action);
      }
    },
    //发布方法
    send: function(type) {
      //如果该消息被订阅
      if (_msg[type]) {
        //遍历存储的消息回调函数
        for (var i = 0; i < _msg[type].length; i++) {
          _msg[type][i] && _msg[type][i]();
        }
      }
    }
  };
})();

Mediator.register("a", function() {
  console.log("1");
});
Mediator.register("a", function() {
  console.log("2");
});
Mediator.register("b", function() {
  console.log("3");
});
Mediator.register("b", function() {
  console.log("4");
});
Mediator.send("a");

Mediator.send("b");
```

## 备忘录模式

在不破坏对象封装性的前提下，在对象职位捕获并保存该对象内部的状态以便日后对象使用或者对象恢复到以前的某个状态

```js
//备忘录类
var Pages = (function() {
  //信息缓存对象
  var cache = {};
  return function(page) {
    //判断该页面数据是否在缓存中
    if (cache[page]) {
      var lis = "";
      //如果缓存中有数据则直接取缓存中的数据
      var data = cache[page];
      if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
          lis += "<li>" + data[i] + "</li>";
        }
        $("#test").html(lis);
        $("#page").html(page);
      } else {
        alert("已经是最后一页！");
        $("#page").html(page - 1);
      }
    } else {
      $.ajax({
        url: "/Home/Page",
        data: { pageSize: 15, pageIndex: page },
        type: "post",
        success: function(data) {
          var lis = "";
          //如果缓存总没有缓存数据，我们就存储请求数据
          cache[page] = data;
          if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
              lis += "<li>" + data[i] + "</li>";
            }
            $("#test").html(lis);
            $("#page").html(page);
          } else {
            alert("已经是最后一页！");
            $("#page").html(page - 1);
          }
        }
      });
    }
  };
})();
```

## 迭代器模式

在不暴露对象内部结构的同时，可以顺序的访问聚合对象内部的元素

```html
<ul id="container">
 <li>1</li>
 <li>2</li>
 <li>3</li>
 <li>4</li>
/ul>
```

```js
//迭代器
var Iterator = function(items, container) {
  //获取父容器，若container参数存在，并且可以获取该元素则获取，否则获取document
  var container =
      (container && document.getElementById(container)) || document,
    //获取元素
    items = container.getElementsByTagName(items),
    //获取元素长度
    length = items.length,
    //当前索引值
    index = 0;
  //缓存原生数组splice方法
  var splice = [].splice;
  return {
    //获取第一个元素
    first: function() {
      index = 0;
      return items[index];
    },
    //获取最后一个元素
    second: function() {
      index = length - 1;
      return items[index];
    },
    //获取前一个元素
    pre: function() {
      if (--index > 0) {
        return items[index];
      } else {
        index = 0;
        return null;
      }
    },
    //获取后一个元素
    next: function() {
      if (++index < length) {
        return items[index];
      } else {
        index = length - 1;
        return null;
      }
    },
    //对每一个元素执行某一个方法
    get: function(num) {
      //如果num大于等于0再获取正向获取，否则逆向获取
      index = num >= 0 ? num % length : (num % length) + length;
      return items[index];
    },
    //对某一个元素执行某一个方法
    dealEach: function(fn) {
      //第二个参数开始为回调函数中参数
      var args = splice.call(arguments, 1);
      for (var i = 0; i < length; i++) {
        fn.apply(items[i], args);
      }
    },
    //排他方式处理某一个元素
    dealItem: function(num, fn) {
      //第三个参数开始为回调函数中参数
      //用this.get方法设置index索引值
      fn.apply(this.get(num), splice.call(arguments, 2));
    },
    exclusive: function(num, allFn, numFn) {
      //对所有元素执行回调函数
      this.dealEach(allFn);
      //如果num类型为数组
      if (Object.prototype.toString.call(num) === "[object Array]") {
        //遍历num数组
        for (var i = 0; i < num.length; i++) {
          this.dealItem(num[i], numFn);
        }
      } else {
        //处理第num个元素
        this.dealItem(num, numFn);
      }
    }
  };
};

var test = new Iterator("li", "container");
//我们先试试获取元素
console.log(test.first());
console.log(test.pre());
console.log(test.next());
console.log(test.get(2000));

test.dealEach(
  function(text, color) {
    this.innerHTML = text;
    this.style.background = color;
  },
  "背景变色",
  "#dddddd"
);

test.exclusive(
  [0, 1],
  function() {
    this.innerHTML = "被排除的";
    this.style.background = "green";
  },
  function() {
    this.innerHTML = "选中的";
    this.style.background = "red";
  }
);
```

### 数组迭代器

```js
var eachArray = function(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    //依次执行回调函数，注意回调函数中传入的参数第一个为索引，第二个为索引对应的值
    if (fn.call(arr[i], i, arr[i]) === false) {
      break;
    }
  }
};

for (var arr = [], i = 0; i < 5; arr[i++] = i);
eachArray(arr, function(i, data) {
  console.log(i, data);
});
```

### 对象迭代器

```js
var eachObject = function(obj, fn) {
  for (var i in obj) {
    if (fn.call(obj[i], i, obj[i]) === false) {
      break;
    }
  }
};

var obj = { a: 1, b: 2, c: 3 };
eachObject(obj, function(i, data) {
  console.log(i, data);
});
```

## 解释器模式

对于一种语言，给出其文法表示形式，并定义一种解释器，通过使用这种解释器来解释语言中定义的句子

### 同级兄弟元素遍历

```js
function getSublingName(node) {
  //如果存在兄弟元素
  if (node.previousSibling) {
    //返回的兄弟元素名称字符串
    var name = "",
      //紧邻兄弟元素中相同名称的元素个数
      count = 1,
      //原始节点名称
      nodeName = node.nodeName,
      //前一个兄弟元素
      sibling = node.previousSibling;

    //如果存在前一个兄弟元素
    while (sibling) {
      //如果节点为元素，并且节点类型与前一个兄弟元素相同，并且前一个兄弟元素名称存在
      if (
        sibling.nodeType == 1 &&
        sibling.nodeType === node.nodeType &&
        sibling.nodeName
      ) {
        //如果节点名称和前一个兄弟元素名称相同
        if (nodeName == sibling.nodeName) {
          //节点名称后面添加技数
          name += ++count;
        } else {
          //重复相同紧邻节点名称节点个数
          count = 1;
          //追加新的节点名称
          name += "|" + sibling.nodeName.toUpperCase();
        }
      }
      //向前获取一个兄弟元素
      sibling = sibling.previousSibling;
    }
    return name;
  } else {
    //如果不存在兄弟元素返回‘’
    return "";
  }
}
```

### 遍历文档树

```js
//元素位置解释器
var Interpreter = (function() {
  //node目标节点，wrap容器节点
  return function(node, wrap) {
    //路径数组
    var path = [],
      //如果不存在容器节点，默认为document
      wrap = wrap || document;
    //如果当前(目标)节点等于容器节点
    if (node === wrap) {
      //容器节点为元素
      if (wrap.nodeType == 1) {
        //路径数组中输入容器节点名称
        path.push(wrap.nodeName.toUpperCase());
      }
      //返回最终路径数组结果
      return path;
    }
    //如果当前节点的父节点不等于容器节点
    if (node.parentNode !== wrap) {
      //对当前节点的父节点执行遍历操作
      path = arguments.callee(node.parentNode, wrap);
    } else {
      //如果容器节点为元素
      if (wrap.nodeType == 1) {
        //路径数组中输入容器节点名称
        path.push(wrap.nodeName.toUpperCase());
      }
    }
    //获取元素的兄弟元素名称的统计
    var sublingNames = getSublingName(node);

    //如果节点为元素
    if (node.nodeType == 1) {
      //输入当前节点元素名称及其前面兄弟元素名称统计
      path.push(node.nodeName.toUpperCase() + sublingNames);
    }
    //返回最终路径数组结果
    return path;
  };
})();
```

测试

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <div></div>
    <div id="container">
      <div>
        <div>
          <ul>
            <li><span id="span1">1</span></li>
            <li><span id="span2">2</span></li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <ul>
            <li><span id="span3">3</span></li>
            <li><input type="button" id="btn" value="获取我的位置" /></li>
          </ul>
        </div>
      </div>
    </div>
    <script>
      document.getElementById("btn").addEventListener("click", function() {
        var path = Interpreter(this);
        console.log(path.join(">"));
      });
    </script>
  </body>
</html>
```