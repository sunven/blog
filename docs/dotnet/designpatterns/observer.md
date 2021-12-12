# 观察者模式

定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，这个主题对象在状态发生变化时，会通知所有观察者对象，使它们能够自动更新自己的行为

```csharp
//房屋开发商，是被观察者--该类型相当于抽象主体角色Subject
public abstract class HousingDeveloper
{
    protected IList<Observer> Observers;
    //构造函数初始化观察者列表实例
    protected HousingDeveloper()
    {
        Observers = new List<Observer>();
    }
    //增加客户
    public abstract void Add(Observer observer);
    //删除客户
    public abstract void Delete(Observer observer);
    //通知客户
    public void Notify()
    {
        foreach (var observer in Observers)
        {
            observer.Update(observer.Name + ":有房了。");
        }
    }
}
//武汉房屋开发商
public sealed class WuhanHousingDeveloper : HousingDeveloper
{
    //增加客户
    public override void Add(Observer observer)
    {
        Observers.Add(observer);
    }
    //删除客户
    public override void Delete(Observer observer)
    {
        Observers.Remove(observer);
    }
}
//客户的抽象接口--相当于抽象观察者角色（Observer）
public abstract class Observer
{
    public string Name { get; set; }
    //初始化状态数据
    protected Observer(string name)
    {
        Name = name;
    }
    //更新客户状态
    public virtual void Update(string msg)
    {
        Console.WriteLine(msg);
    }
}
public sealed class NoHouseObserver : Observer
{
    public NoHouseObserver(string name) : base(name) { }
    public override void Update(string msg)
    {
        base.Update(msg);
        Console.WriteLine("我立即去买房");
    }
}
public sealed class HasHouseObserver : Observer
{
    public HasHouseObserver(string name) : base(name) { }
    public override void Update(string msg)
    {
        base.Update(msg);
        Console.WriteLine("我先考虑下");
    }
}
```

```csharp
HousingDeveloper hd=new WuhanHousingDeveloper();
hd.Add(new NoHouseObserver("A"));
hd.Add(new NoHouseObserver("B"));
hd.Add(new NoHouseObserver("C"));
hd.Add(new HasHouseObserver("D"));
hd.Add(new HasHouseObserver("E"));
hd.Add(new HasHouseObserver("F"));
hd.Notify();
```

## reference

[C#设计模式之十六观察者模式（Observer Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/7928521.html)

[C#设计模式(17)——观察者模式（Observer Pattern）](http://www.cnblogs.com/zhili/p/ObserverPattern.html)
