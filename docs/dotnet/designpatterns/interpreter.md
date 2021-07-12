# 解释器模式

给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子

```csharp
// 抽象表达式
public abstract class Expression
{
    protected Dictionary<string, int> Table = new Dictionary<string, int>(9);
    protected Expression()
    {
        Table.Add("一", 1);
        Table.Add("二", 2);
        Table.Add("三", 3);
        Table.Add("四", 4);
        Table.Add("五", 5);
        Table.Add("六", 6);
        Table.Add("七", 7);
        Table.Add("八", 8);
        Table.Add("九", 9);
    }
    public virtual void Interpreter(InterpreterContext context)
    {
        if (context.Statement.Length == 0)
        {
            return;
        }
        foreach (var key in Table.Keys)
        {
            var value = Table[key];
            if (context.Statement.EndsWith(key + GetPostFix()))
            {
                context.Data += value * Multiplier();
                context.Statement = context.Statement.Substring(0, context.Statement.Length - GetLength());
            }
            if (context.Statement.EndsWith("零"))
            {
                context.Statement = context.Statement.Substring(0, context.Statement.Length - 1);
            }
        }
    }
    public abstract string GetPostFix();
    public abstract int Multiplier();
    //这个可以通用，但是对于个位数字例外，所以用虚方法
    public virtual int GetLength()
    {
        return GetPostFix().Length + 1;
    }
}
//个位表达式
public sealed class GeExpression : Expression
{
    public override string GetPostFix()
    {
        return "";
    }
    public override int Multiplier()
    {
        return 1;
    }
    public override int GetLength()
    {
        return 1;
    }
}
//十位表达式
public sealed class ShiExpression : Expression
{
    public override string GetPostFix()
    {
        return "十";
    }
    public override int Multiplier()
    {
        return 10;
    }
}
//百位表达式
public sealed class BaiExpression : Expression
{
    public override string GetPostFix()
    {
        return "百";
    }
    public override int Multiplier()
    {
        return 100;
    }
}
//千位表达式
public sealed class QianExpression : Expression
{
    public override string GetPostFix()
    {
        return "千";
    }
    public override int Multiplier()
    {
        return 1000;
    }
}
//环境上下文
public sealed class InterpreterContext
{
    public InterpreterContext(string statement)
    {
        Statement = statement;
    }
    public string Statement { get; set; }
    public int Data { get; set; }
}
```

调用：

```csharp
const string roman = "六千四百五十二";
var interpreterContext = new InterpreterContext(roman);
var tree = new ArrayList
{
    new GeExpression(),
    new ShiExpression(),
    new BaiExpression(),
    new QianExpression()
};
foreach (Expression exp in tree)
{
    exp.Interpreter(interpreterContext);
}
Console.Write(interpreterContext.Data);
```

## reference

[C#设计模式之二十三解释器模式（Interpreter Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/8242238.html)