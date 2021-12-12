# Razor

## 问题

[mvc表单如何绑定bool类型的属性或变量](https://q.cnblogs.com/q/65416/)

## q

```
@{
    Layout = null;
    var b1 = true;
    var b2 = false;
}
<div class="@b1">@b1</div>
<div class="@b2">@b2</div>
```

```
public override void Execute()
        {

#line 1 "..\..\Views\Home\Index.cshtml"

            Layout = null;
            var b1 = true;
            var b2 = false;


#line default
#line hidden
            WriteLiteral("\r\n<div");

            WriteAttribute("class", Tuple.Create(" class=\"", 72), Tuple.Create("\"", 83)

#line 6 "..\..\Views\Home\Index.cshtml"
, Tuple.Create(Tuple.Create("", 80), Tuple.Create<System.Object, System.Int32>(b1

#line default
#line hidden
, 80), false)
            );

            WriteLiteral(">");


#line 6 "..\..\Views\Home\Index.cshtml"
            Write(b1);


#line default
#line hidden
            WriteLiteral("</div>\r\n<div");

            WriteAttribute("class", Tuple.Create(" class=\"", 100), Tuple.Create("\"", 111)

#line 7 "..\..\Views\Home\Index.cshtml"
, Tuple.Create(Tuple.Create("", 108), Tuple.Create<System.Object, System.Int32>(b2

#line default
#line hidden
, 108), false)
            );

            WriteLiteral(">");


#line 7 "..\..\Views\Home\Index.cshtml"
            Write(b2);


#line default
#line hidden
            WriteLiteral("</div>\r\n");

        }
```

![image](http://7xk2dp.com1.z0.glb.clouddn.com/razor-201804201153201804201154194347.png)

## 工具

[Razor Generator](https://marketplace.visualstudio.com/items?itemName=DavidEbbo.RazorGenerator)

[PrecompiledMvcViewEngineContrib](https://www.nuget.org/packages/PrecompiledMvcViewEngineContrib/)

## reference

[使用RazorGenerator和预编译MVC引擎将Razor视图编译成DLL](https://www.cnblogs.com/xurongjian/p/6915387.html)

[.NET MVC4 Razor视图预编译（一）](http://www.cnblogs.com/263613093/p/4309515.html)

[.NET MVC Razor模板预编译（二）](http://www.cnblogs.com/263613093/p/4317232.html)
