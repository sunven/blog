# backbonejs

[http://backbonejs.org/](http://backbonejs.org/)

[我对Backbone.js的一些认识](https://www.cnblogs.com/lyzg/p/5634565.html)

## 示例

[todos](https://github.com/liuyunzhuge/blog/tree/master/todos)

```html
<!DOCTYPE html>
<html>

<head>
    <script src="https://code.jquery.com/jquery-1.11.3.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
</head>

<body>
    <button id="check">请点击此处打卡</button>
    <ul id="person-list"></ul>
</body>
<script>
    (function ($) {
        //       新建Model构造函数
        var People = Backbone.Model.extend({
            name: null, //姓名
            ctime: null //打卡时间
        });
        //     新建Collection构造函数
        var Peoples = Backbone.Collection.extend({
            initialize: function (models, options) {
                this.bind("add", options.view.addOnePerson); //add将Model添加进Collection，在这里调用View中定义的addOnePerson函数
            }
        });
        //     新建View构造函数
        AppView = Backbone.View.extend({
            el: $("body"),
            initialize: function () {
                this.peoples = new Peoples(null, {
                    view: this
                }) //实例化一个Collection
            },
            events: {
                "click #check": "checkIn", //绑定#check的click事件，并执行checkIn函数
            },
            checkIn: function () {
                var person_name = prompt("您的姓名是？");
                if (person_name == "") {
                    person_name = "路人甲";
                }
                var ctime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
                var person = new People({
                    name: person_name,
                    ctime: ctime
                });
                this.peoples.add(person);
            },
            addOnePerson: function (model) {
                $("#person-list").append("<li>" + model.get('name') + "您好，您的打卡时间为：" + model.get('ctime') +
                    "</li>");
            }
        });
        var appview = new AppView; //实例化一个View，自动执行initialize中的函数
    })(jQuery)
</script>

</html>
```
