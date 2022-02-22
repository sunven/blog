# 单例模式

保证一个类只有一个实例

## 常规实现

```csharp
/// <summary>
/// 单例模式的实现
/// </summary>
public sealed class Singleton
{
    // 定义一个静态变量来保存类的实例
    private static volatile Singleton _uniqueInstance;
    // 定义一个标识确保线程同步
    private static readonly object Locker = new object();
    // 定义私有构造函数，使外界不能创建该类实例
    private Singleton()
    {
    }
    /// <summary>
    /// 定义公有方法提供一个全局访问点,同时你也可以定义公有属性来提供全局访问点
    /// </summary>
    /// <returns></returns>
    public static Singleton GetInstance()
    {
        // 当第一个线程运行到这里时，此时会对locker对象 "加锁"，
        // 当第二个线程运行该方法时，首先检测到locker对象为"加锁"状态，该线程就会挂起等待第一个线程解锁
        // lock语句运行完之后（即线程运行完之后）会对该对象"解锁"
        // 双重锁定只需要一句判断就可以了
        if (_uniqueInstance == null)
        {
            lock (Locker)
            {
                // 如果类的实例不存在则创建，否则直接返回
                if (_uniqueInstance == null)
                {
                    _uniqueInstance = new Singleton();
                }
            }
        }
        return _uniqueInstance;
    }
}
```

## 用c#特性实现

```csharp
public sealed class Singleton1
{
    public static readonly Singleton1 Instance=new Singleton1();
    private Singleton1(){}
}
```

等同于：

```csharp
public sealed class Singleton2
{
    public static readonly Singleton2 Instance;
    static Singleton2()
    {
        Instance=new Singleton2();
    }
    private Singleton2(){}
}
```

## reference

[C#设计模式之一单例模式（Singleton Pattern）【创建型】](http://www.cnblogs.com/PatrickLiu/p/8250985.html)

[C#设计模式(1)——单例模式](http://www.cnblogs.com/zhili/p/SingletonPatterm.html)
