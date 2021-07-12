# 动态api

动态WebApi实现了直接对Service的调用，其实没有跨过ApiController,只是我们自己创建出ApiController

实现主要分以下几步

## 一 对默认WebApi服务的替换

```csharp
ApiGlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerSelector), new AbpHttpControllerSelector(ApiGlobalConfiguration.Configuration));
ApiGlobalConfiguration.Configuration.Services.Replace(typeof(IHttpActionSelector), new AbpApiControllerActionSelector());
ApiGlobalConfiguration.Configuration.Services.Replace(typeof(HttpControllerActivator), new AbpControllerActivator());
```

## 二 路由

定义好路由

```csharp
ApiGlobalConfiguration.Configuration.Routes.MapHttpRoute(
    "DynamicWebApi",
    "apiservice/{service}/{action}/{id}",
    new { id = RouteParameter.Optional }
);
```

## 三 缓存Service

找出所有需要做成动态WebApi的Service，哪些是Controller哪些是Action事先准备好

```csharp
var controllerInfo = new DynamicApiControllerInfo("Order", typeof(DynamicApiController<IOrderService>));
foreach (var methodInfo in DynamicApiControllerActionHelper.GetMethodsOfType(typeof(IOrderService)))
{
    controllerInfo.Actions[methodInfo.Name] = new DynamicApiActionInfo(methodInfo.Name, HttpMethod.Get, methodInfo);
}
DynamicApiControllerManager.Register(controllerInfo);
```

## 四 使用OWIN来替代IIS

### 什么是 OWIN ？

OWIN 的全称是 "Open Web Interface for .NET"， OWIN 在 .NET Web 服务器和 .NET Web 应用之间定义了一套标准的接口， 其目的是为了实现服务器与应用之间的解耦， 鼓励为 .NET Web 应用开发简单模块。

### 为什么使用 OWIN

OWIN 定义了 .NET Web 服务器与 .NET Web 应用之间的标准接口， 将应用与服务器 解耦， 使得便携式 .NET Web 应用以及跨平台的愿望成为现实， 标准的 OWIN 应用可以在任何 OWIN 兼容的服务器上运行， 不再依赖与 Windows 和 IIS 。

### OWIN使用

应用启动时调用

```csharp
const string url = "http://localhost:8080/";
var startOpts = new StartOptions(url);
using (WebApp.Start<Startup>(startOpts))
{
    Console.WriteLine("Server run at " + url + " , press Enter to exit.");
    Console.ReadKey();
}

```

Startup

```csharp
public class Startup
{
    public void Configuration(IAppBuilder appBuilder)
    {
        appBuilder.UseWebApi(ApiGlobalConfiguration.Configuration);
    }
}
```

### 请求分析

http://localhost:8080/apiservice/Order/GetOrderDetail?s=1111

- Order是Controller，也对应IOrderService这个Service
- GetOrderDetail是Action,也对应IOrderService中的GetOrderDetail方
- s=1111为参数

执行顺序

1. 先进入AbpHttpControllerSelector，筛选出动态api的请求，
2. 再进入AbpControllerActivator，创建出ApiController
3. 再进入AbpApiControllerActionSelector，找出Action。
4. 最后进入DyanamicHttpActionDescriptor执行Action,也就是执行对应Service的方法

示例代码：[https://github.com/sunven/Abp1](https://github.com/sunven/Abp1)

## Reference

[OWIN初探](http://blog.csdn.net/linux7985/article/details/44079103)

[ASP.NET Web API和依赖注入](http://www.cnblogs.com/shanyou/archive/2012/10/19/2730380.html)

[ABP之动态WebAPI(一)](http://www.cnblogs.com/gangtianci/p/4691150.html)

[ABP之动态WebAPI(二)](http://www.cnblogs.com/gangtianci/p/4694628.html)