# 代理模式

给某一个对象提供一个代理，并由代理对象控制对原对象的引用

```csharp
//代理抽象类
public abstract class AgentAbstract
{
    public virtual void Do(string thing)
    {
        Console.WriteLine(thing);
    }
}
/// <summary>
/// 网络
/// </summary>
public sealed class Network : AgentAbstract
{
    public override void Do(string thing)
    {
        Console.WriteLine(thing);
    }
}
//该类型是代理类型----相当于具体的Proxy角色
public sealed class Proxy : AgentAbstract
{
    private readonly Network _network;
    //实际Network
    public Proxy()
    {
        _network = new Network();
    }
    public override void Do(string thing)
    {
        Console.WriteLine("之前");
        _network.Do(thing);
        Console.WriteLine("之后");
    }
}
```

```csharp
var proxy = new Proxy();
proxy.Do("上网");
```

## reference

[C#设计模式之十二代理模式（Proxy Pattern）【结构型】](http://www.cnblogs.com/PatrickLiu/p/7814004.html)

[C#设计模式(13)——代理模式（Proxy Pattern）](http://www.cnblogs.com/zhili/p/ProxyPattern.html)
