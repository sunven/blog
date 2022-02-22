# 模板方法模式

把相同的部分抽象出来到抽象类中去定义，具体子类来实现具体的不同部分

```csharp
public abstract class Money
{
    public void Get()
    {
        Atm();
        Card();
        Password();
        Over();
    }
    public void Atm()
    {
        Console.WriteLine("找到ATM");
    }
    public abstract void Card();
    public void Password()
    {
        Console.WriteLine("输入密码");
    }
    public void Over()
    {
        Console.WriteLine("拿钱取卡");
    }
}
public class ChinaBank : Money
{
    public override void Card()
    {
        Console.WriteLine("中国银行银行卡");
    }
}
public class ShanghaiBank : Money
{
    public override void Card()
    {
        Console.WriteLine("上海银行银行卡");
    }
}
```

```csharp
var chain = new ChinaBank();
chain.Get();
var shBank = new ShanghaiBank();
shBank.Get();
```

## reference

[C#设计模式之十三模板方法模式（Template Method Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/7837716.html)

[C#设计模式(14)——模板方法模式（Template Method）](http://www.cnblogs.com/zhili/p/TemplateMethodPattern.html)
