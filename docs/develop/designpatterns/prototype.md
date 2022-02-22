# 原型模式

要创建一个复杂对象，还要创建多个这样的对象

```csharp
public abstract class Prototype
{
    public abstract Prototype Clone();
    public abstract void Attack();
    public abstract void Protect();
}
/// <summary>
/// 鸣人
/// </summary>
public class MingrenPrototype : Prototype
{
    /// <summary>
    /// 浅拷贝
    /// </summary>
    /// <returns></returns>
    public override Prototype Clone()
    {
        // 调用MemberwiseClone方法实现的是浅拷贝，另外还有深拷贝
        return (Prototype)this.MemberwiseClone();
    }
    public override void Attack()
    {
        Console.WriteLine("攻击");
    }
    public override void Protect()
    {
        Console.WriteLine("保护");
    }
}
```

调用

```csharp
var mingren1 = new MingrenPrototype();
var mingren2 = mingren1.Clone() as MingrenPrototype;
//mingren1 负责攻击
mingren1.Attack();
//mingren2 负责保护
mingren2?.Protect();
```

## reference

[C#设计模式之五原型模式（Prototype Pattern）【创建型】](http://www.cnblogs.com/PatrickLiu/p/7640873.html)

[C#设计模式(6)——原型模式（Prototype Pattern）](http://www.cnblogs.com/zhili/p/PrototypePattern.html)
