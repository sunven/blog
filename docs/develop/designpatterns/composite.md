# 组合模式

组合模式允许你将对象组合成树形结构来表现”部分-整体“的层次结构，使得客户以一致的方式处理单个对象以及对象的组合

## 透明式组合模式

接口行为集合包含两个部分，一部分是对象本身所包含的行为（比如Travel），另外一部分是容器对象本身所包含的管理子对象的行为(Two,Ten)

```csharp
/// <summary>
/// 该抽象类就是车抽象接口的定义，该类型就相当于是抽象构件Component类型
/// </summary>
public abstract class Car
{
    //行驶
    public abstract void Travel();
    //载两个人
    public abstract void Two(Car car);
    //载十个人
    public abstract void Ten(Car car);
}
/// <summary>
/// 摩托车
/// </summary>
public sealed class Motorcycle : Car
{
    public override void Travel()
    {
        Console.WriteLine("摩托车行驶");
    }
    public override void Ten(Car car)
    {
        Console.WriteLine("不能载十个人");
    }
    public override void Two(Car car)
    {
        Console.WriteLine("不能载两个人");
    }
}
/// <summary>
/// SUV
/// </summary>
public class SuvCar : Car
{
    public override void Travel()
    {
        Console.WriteLine("SUV行驶");
    }
    public override void Ten(Car car)
    {
        Console.WriteLine("不能载十个人");
    }
    public override void Two(Car car)
    {
        Console.WriteLine("载两个人");
    }
}
```

## 安全式组合模式

只定义子对象的方法，确切的说这个抽象构件只定义两类对象共有的行为，然后容器对象的方法定义在“树枝构件角色”上，这样叶子对象有叶子对象的方法，容器对象有容器对象的方法，这样责任很明确

```csharp
/// <summary>
/// 该抽象类就是车抽象接口的定义，该类型就相当于是抽象构件Component类型
/// </summary>
public abstract class Car1
{
    //行驶
    public abstract void Travel();
}
/// <summary>
/// 摩托车
/// </summary>
public sealed class Motorcycle1 : Car1
{
    public override void Travel()
    {
        Console.WriteLine("摩托车行驶");
    }
}
/// <summary>
/// 四轮车
/// </summary>
public abstract class FourCar : Car1
{
    public override void Travel()
    {
        Console.WriteLine("四轮车行驶");
    }
    //载两个人
    public abstract void Two(Car1 car);
    //载十个人
    public abstract void Ten(Car1 car);
}
/// <summary>
/// Bus
/// </summary>
public class Bus : FourCar
{
    public override void Travel()
    {
        Console.WriteLine("BUS行驶");
    }
    public override void Ten(Car1 car)
    {
        Console.WriteLine("载十个人");
    }
    public override void Two(Car1 car)
    {
        Console.WriteLine("载两个人");
    }
}
```

调用：

```csharp
//透明式
Car car = new Motorcycle();
car.Travel();
car.Two(new SuvCar());
car.Ten(new SuvCar());
car = new SuvCar();
car.Travel();
car.Two(new SuvCar());
car.Ten(new SuvCar());
//安全式
Car1 car1 = new Motorcycle1();
car1.Travel();
Car1 bus = new Bus();
bus.Travel();
((FourCar)bus).Two(new Bus());
((FourCar)bus).Ten(new Bus());
```

[C#设计模式之九组合模式（Composite Pattern）【结构型】](http://www.cnblogs.com/PatrickLiu/p/7743118.html)

[C#设计模式(10)——组合模式（Composite Pattern）](http://www.cnblogs.com/zhili/p/CompositePattern.html)
