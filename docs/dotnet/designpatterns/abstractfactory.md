# 抽象工厂模式

抽象工厂模式很难支持新种类产品的变化。这是因为抽象工厂接口中已经确定了可以被创建的产品集合，如果需要添加新产品，此时就必须去修改抽象工厂的接口，这样就涉及到抽象工厂类的以及所有子类的改变，这样也就违背了“开发——封闭”原则。

```csharp
/// <summary>
/// 抽象工厂类，提供open 和 close 的接口
/// </summary>
public abstract class AbstractFactory
{
    public abstract Open CreateOpen();
    public abstract Close CreateClose();
}
/// <summary>
/// Ef
/// </summary>
public class EfFactory : AbstractFactory
{
    // 打开ef连接
    public override Open CreateOpen()
    {
        return new EfOpen();
    }

    // 关闭dapper连接
    public override Close CreateClose()
    {
        return new EfClose();
    }
}
/// <summary>
/// Dapper
/// </summary>
public class DapperFactory : AbstractFactory
{
    // 打开dapper连接
    public override Open CreateOpen()
    {
        return new DapperOpen();
    }
    // 关闭dapper连接
    public override Close CreateClose()
    {
        return new DapperClose();
    }
}
/// <summary>
/// 打开连接
/// </summary>
public abstract class Open
{
    /// <summary>
    /// 打印方法，用于输出信息
    /// </summary>
    public abstract void Print();
}
/// <summary>
/// 关闭连接
/// </summary>
public abstract class Close
{
    /// <summary>
    /// 打印方法，用于输出信息
    /// </summary>
    public abstract void Print();
}
/// <summary>
/// ef open
/// </summary>
public class EfOpen : Open
{
    public override void Print()
    {
        Console.WriteLine("ef open");
    }
}
/// <summary>
/// dapper open
/// </summary>
public class DapperOpen : Open
{
    public override void Print()
    {
        Console.WriteLine("dapper open");
    }
}
/// <summary>
/// ef close
/// </summary>
public class EfClose : Close
{
    public override void Print()
    {
        Console.WriteLine("ef close");
    }
}
/// <summary>
/// dapper close
/// </summary>
public class DapperClose : Close
{
    public override void Print()
    {
        Console.WriteLine("depper close");
    }
}
```

调用：

```csharp
// ef 打开和关闭
AbstractFactory efFactory = new EfFactory();
efFactory.CreateOpen().Print();
efFactory.CreateClose().Print();
// dapper 打开和关闭
AbstractFactory dapperFactory = new DapperFactory();
dapperFactory.CreateOpen().Print();
dapperFactory.CreateClose().Print();
```

## reference

[C#设计模式之三抽象工厂模式（AbstractFactory）【创建型】](http://www.cnblogs.com/PatrickLiu/p/7596897.html)
[C#设计模式(4)——抽象工厂模式](http://www.cnblogs.com/zhili/p/AbstractFactory.html)
