# 策略模式

针对一组算法，将每个算法封装到具有公共接口的独立的类中，从而使它们可以相互替换

```csharp
public interface IStragety
{
    void Send(string msg);
}
public class EmailStragety : IStragety
{
    public void Send(string msg)
    {
        Console.WriteLine("邮件通知：" + msg);
    }
}
public class SmsStragety : IStragety
{
    public void Send(string msg)
    {
        Console.WriteLine("短信通知：" + msg);
    }
}
public sealed class NotifyContext
{
    public NotifyContext(IStragety strategy)
    {
        Stragety = strategy;
    }
    public IStragety Stragety { get; set; }
    public void Send(string msg)
    {
        Stragety.Send(msg);
    }
}
```

调用：

```csharp
var context = new NotifyContext(new EmailStragety());
context.Send("新的消息");
context.Stragety = new SmsStragety();
context.Send("第二条消息");
```

## reference

[C#设计模式之十九策略模式（Stragety Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/8057654.html)

[C#设计模式(20)——策略者模式（Stragety Pattern）](http://www.cnblogs.com/zhili/p/StragetyPattern.html)