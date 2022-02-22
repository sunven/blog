# 享元模式

运用共享技术有效地支持大量细粒度的对象

内部状态：在享元对象的内部并且不会随着环境的改变而改变的共享部分

外部状态：随环境改变而改变的，不可以共享的状态

```csharp
/// <summary>
///  抽象享元类，提供具体享元类具有的方法
/// </summary>
public abstract class Flyweight
{
    /// <summary>
    /// 具体方法
    /// </summary>
    /// <param name="outstate">外部状态</param>
    public abstract void Operation(int outstate);
}
public class FlyweightImp : Flyweight
{
    // 内部状态
    private readonly string _innerState;
    // 构造函数
    public FlyweightImp(string innerState)
    {
        _innerState = innerState;
    }
    /// <summary>
    /// 享元类的实例方法
    /// </summary>
    /// <param name="outstate">外部状态</param>
    public override void Operation(int outstate)
    {
        Console.WriteLine("具体实现类: innerState {0}, outstate {1}", _innerState, outstate);
    }
}
/// <summary>
/// 享元工厂，负责创建和管理享元对象
/// </summary>
public class FlyweightFactory
{
    public static Dictionary<string, Flyweight> DicFlyweight = new Dictionary<string, Flyweight>();
    public static Flyweight GetFlyweight(string key)
    {
        if (DicFlyweight.ContainsKey(key))
        {
            return DicFlyweight[key];
        }
        var flyweight = new FlyweightImp(key);
        DicFlyweight.Add(key, flyweight);
        return flyweight;
    }
}
```

调用：

```csharp
foreach (var item in new[] { "a", "b", "c", "a", "b" })
{
    var flyweight = FlyweightFactory.GetFlyweight(item);
    flyweight.Operation(1);
}
Console.WriteLine(FlyweightFactory.DicFlyweight.Count);
```

## reference

[C#设计模式之十一享元模式（Flyweight Pattern）【结构型】](http://www.cnblogs.com/PatrickLiu/p/7792973.html)

[C#设计模式(12)——享元模式（Flyweight Pattern）](http://www.cnblogs.com/zhili/p/FlyweightPattern.html)
