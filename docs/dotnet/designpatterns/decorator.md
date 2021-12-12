# 装饰者模式

动态地给一个对象添加额外的职责

```csharp
/// <summary>
/// DbHelper
/// </summary>
public abstract class DbHelper
{
    public abstract void Add();
}
/// <summary>
/// SqlServerDbHelper
/// </summary>
public class SqlServerDbHelper : DbHelper
{
    /// <summary>
    /// 重写基类方法
    /// </summary>
    public override void Add()
    {
        Console.WriteLine("Sql Server add");
    }
}
/// <summary>
/// 装饰抽象类,要让装饰完全取代抽象组件，所以必须继承自DbHelper
/// </summary>
public abstract class Decorator : DbHelper
{
    private readonly DbHelper _dbHelper;
    protected Decorator(DbHelper p)
    {
        _dbHelper = p;
    }
    public override void Add()
    {
        _dbHelper?.Add();
    }
}
/// <summary>
/// 新增时的检测，即具体装饰者
/// </summary>
public class CheckDecorator : Decorator
{
    public CheckDecorator(DbHelper dbHelper)
        : base(dbHelper)
    {
    }
    public override void Add()
    {
        // 添加新的行为
        Check();
        base.Add();
    }
    /// <summary>
    /// 新的行为方法
    /// </summary>
    public void Check()
    {
        Console.WriteLine("检测是否新增过");
    }
}
```

```csharp
// SqlServerDbHelper
DbHelper dbHelper = new SqlServerDbHelper();
// check
Decorator decorator = new CheckDecorator(dbHelper);
decorator.Add();
```

## reference

[C#设计模式之八装饰模式（Decorator Pattern）【结构型】](http://www.cnblogs.com/PatrickLiu/p/7723225.html)

[C#设计模式(9)——装饰者模式（Decorator Pattern）](http://www.cnblogs.com/zhili/p/DecoratorPattern.html)
