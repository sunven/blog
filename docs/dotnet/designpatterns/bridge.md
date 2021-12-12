# 桥接模式

将抽象部分与实现部分解耦

```csharp
/// <summary>
/// 数据库
/// </summary>
public abstract class Db
{
    public abstract void Open();
    public abstract void Close();
    public abstract void Add();
}
/// <summary>
/// 数据库操作
/// </summary>
public abstract class DbControlAbstract
{
    public Db Db { get; set; }
    /// <summary>
    /// 打开连接
    /// </summary>
    public virtual void Open()
    {
        Db.Open();
    }
    /// <summary>
    /// 关闭连接
    /// </summary>
    public virtual void Close()
    {
        Db.Close();
    }
    /// <summary>
    /// 增加
    /// </summary>
    public virtual void Add()
    {
        Db.Add();
    }
}
/// <summary>
/// 数据库操作具体事项
/// </summary>
public class DbControl : DbControlAbstract
{
    public override void Add()
    {
        Console.WriteLine("Add override");
        base.Add();
    }
}
/// <summary>
/// Sql Server
/// </summary>
public class SqlServerDb : Db
{
    public override void Open()
    {
        Console.WriteLine("Sql Server open");
    }
    public override void Close()
    {
        Console.WriteLine("Sql Server close");
    }
    public override void Add()
    {
        Console.WriteLine("Sql Server add");
    }
}
/// <summary>
/// MySql
/// </summary>
public class MySqlDb : Db
{
    public override void Open()
    {
        Console.WriteLine("MySql open");
    }
    public override void Close()
    {
        Console.WriteLine("MySql close");
    }
    public override void Add()
    {
        Console.WriteLine("MySql add");
    }
}
```

调用：

```csharp
DbControlAbstract dbControlAbstract = new DbControl();
// Sql Server
dbControlAbstract.Db = new SqlServerDb();
dbControlAbstract.Open();
dbControlAbstract.Add();
dbControlAbstract.Close();
// MySql
dbControlAbstract.Db = new MySqlDb();
dbControlAbstract.Open();
dbControlAbstract.Add();
dbControlAbstract.Close();
```
