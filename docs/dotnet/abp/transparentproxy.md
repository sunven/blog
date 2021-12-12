# 透明代理基础

## 一 如何拦截方法调用？

### 透明代理

> 使用任何穿越远程边界的对象实际上都是在使用透明代理，透明代理会让你觉得远程对象好像就在客户端空间里。
它会把所有调用通过远程调用框架转发给一个真实对象。
透明代理对象寄宿在一个类型为RealProxy的托管类型实例内，RealProxy实现了转发透明代理传递过来的调用的功能。

#### 获取透明代理

定义一个类继承RealProxy, IRemotingTypeInfo

重写Invoke方法

```csharp
public override IMessage Invoke(IMessage msg)
{
    IMethodCallMessage methodMessage = new MethodCallMessageWrapper((IMethodCallMessage)msg);
    var methodInfo = GetMethods(_proxyType).FirstOrDefault(item => item.ToString() == methodMessage.MethodBase.ToString());
    object objReturnValue = null;
    if (methodMessage.MethodName.Equals("GetType") && (methodMessage.ArgCount == 0))
    {
        objReturnValue = _proxyType;
    }
    else if (methodInfo != null)
    {
        if (methodInfo.Name.Equals("Equals")
            || methodInfo.Name.Equals("GetHashCode")
            || methodInfo.Name.Equals("ToString")
            || methodInfo.Name.Equals("GetType"))
        {

            throw new Exception();
        }
        if (_unProxyMethods.All(item => item != methodInfo.Name))
        {
            objReturnValue = methodInfo.Name + "abc";
        }
    }
    return new ReturnMessage(objReturnValue, methodMessage.Args, methodMessage.ArgCount,
        methodMessage.LogicalCallContext, methodMessage);
}
```

拦截方法后，调用都转向Invoke

#### 一般接口及实现

接口

```csharp
public interface IOrderService
{
    string GetOrder();

    string GetOrderDetail();
}
```

实现

```csharp
public class OrderService : IOrderService
{
    public string GetOrder()
    {
        return "GetOrder123";
    }

    public string GetOrderDetail()
    {
        return "GetOrderDetail123";
    }
}
```

调用示例

```csharp
static void Main(string[] args)
{
    var proxy = new ClientProxy(typeof(IOrderService));
    var tp = proxy.GetTransparentProxy();
    var serviceProxy = tp as IOrderService;
    Console.WriteLine(serviceProxy.GetOrder());//GetOrderabc
    Console.WriteLine(serviceProxy.GetOrderDetail());//GetOrderDetailabc
    Console.ReadKey();
}
```

GetOrder和GetOrderDetail都会被拦截进入Invoke中

效果

![image](http://7xk2dp.com1.z0.glb.clouddn.com/TransparentProxyDemo01201712291538239480.png)

示例代码：[https://github.com/sunven/Abp1](https://github.com/sunven/Abp1)

## Reference

[再谈透明代理](http://blog.csdn.net/gentle_wolf/article/details/6456678)
