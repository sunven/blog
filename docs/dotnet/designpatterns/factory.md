# 简单工厂模式

封装改变，既然要封装改变，自然也就要找到改变的代码，然后把改变的代码用类来封装

```csharp
abstract class Operat
{
    public double NumberA { get; set; }
    public double NumberB { get; set; }
    public virtual double GetResult()
    {
        return 0;
    }
}
class Add : Operat
{
    public override double GetResult()
    {
        return NumberA + NumberB;
    }
}
class Sub : Operat
{
    public override double GetResult()
    {
        return NumberA - NumberB;
    }
}

/// <summary>
/// 工厂类
/// </summary>
class Factory
{
    public static Operat GetOperat(string flag)
    {
        switch (flag)
        {
            case "1":
                return new Add();
            case "2":
                return new Sub();
            default:
                return null;
        }
    }
}
```

## reference

[C#设计模式之二工厂方法模式（Factory Method Pattern）【创建型】](http://www.cnblogs.com/PatrickLiu/p/7567880.html)

[C#设计模式(2)——简单工厂模式](http://www.cnblogs.com/zhili/p/SimpleFactory.html)
