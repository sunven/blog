# 命令模式

把一个操作或者行为抽象为一个对象中，通过对命令的抽象化来使得发出命令的责任和执行命令的责任分隔开。命令模式的实现可以提供命令的撤销和恢复功能

```csharp
/// <summary>
/// 接收者抽象类
/// </summary>
public abstract class Receiver
{
    public abstract void Do();
}
// 命令抽象类
public abstract class Command
{
    // 命令接收者
    protected Receiver Receiver;
    protected Command(Receiver receiver)
    {
        Receiver = receiver;
    }
    // 命令执行方法
    public abstract void Action();
}
// 负责执行
public class Invoke
{
    public Command Command;
    public Invoke(Command command)
    {
        Command = command;
    }
    public void ExecuteCommand()
    {
        Command.Action();
    }
}
public class CommandImp : Command
{
    public CommandImp(Receiver receiver)
        : base(receiver)
    {
    }
    public override void Action()
    {
        Receiver.Do();
    }
}
public class Receiver1 : Receiver
{
    public override void Do()
    {
        Console.WriteLine("做事儿");
    }
}
```

调用：

```csharp
var r = new Receiver1();
var c = new CommandImp(r);
var i = new Invoke(c);
i.ExecuteCommand();
```

## reference

[C#设计模式之十四命令模式（Command Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/7873322.html)

[C#设计模式(15)——命令模式（Command Pattern）](http://www.cnblogs.com/zhili/p/CommandPattern.html)
