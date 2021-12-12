# 外观模式

由外观类去保存各个子系统的引用，实现由一个统一的外观类去包装多个子系统类

```csharp
public class SystemA
{
    public void MethodA()
    {
        Console.WriteLine("检查登录信息");
    }
}
public class SystemB
{
    public void MethodB()
    {
        Console.WriteLine("检查账户安全");
    }
}
public class SystemC
{
    public void MethodC()
    {
        Console.WriteLine("检查账户余额");
    }
}
public class Facade
{
    private readonly SystemA _systemA;
    private readonly SystemB _systemB;
    private readonly SystemC _systemC;
    public Facade()
    {
        _systemA = new SystemA();
        _systemB = new SystemB();
        _systemC = new SystemC();
    }
    public void Buy()
    {
        _systemA.MethodA();
        _systemB.MethodB();
        _systemC.MethodC();
        Console.WriteLine("我已经成功购买了！");
    }
}
```

调用：

```csharp
var facade = new Facade();
facade.Buy();
```
