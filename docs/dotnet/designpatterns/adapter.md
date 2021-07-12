# 适配器模式

把一个类的接口变换成客户端所期待的另一种接口

## 类的适配器模式实现

```csharp
/// <summary>
/// 百度地图
/// </summary>
public interface IBaiduMap
{
    void Gen();
}
/// <summary>
/// google 地图
/// </summary>
public abstract class GoogleMap
{
    public void Build()
    {
        Console.WriteLine("goole map build");
    }
}
/// <summary>
/// 适配器类
/// 适配器类提供了百度地图生成方法，但实际提供了google地图的生成方法
/// </summary>
public class BaiduAdapter : GoogleMap, IBaiduMap
{
    public void Gen()
    {
        Build();
    }
}
/// <summary>
/// 百度地图
/// </summary>
public class BaiduMap1
{
    public virtual void Gen()
    {
        Console.WriteLine("baidu map gen");
    }
}
/// <summary>
/// google map
/// </summary>
public class GoogleMap1
{
    public void Build()
    {
        Console.WriteLine("goole map build");
    }
}
/// <summary>
/// 适配器类
/// 适配器类提供了百度地图生成方法，但实际提供了google地图的生成方法
/// </summary>
public class BaiduAdapter1 : BaiduMap1
{
    public GoogleMap1 GoogleMap1 = new GoogleMap1();
    /// <summary>
    /// 实现三个孔插头接口方法
    /// </summary>
    public override void Gen()
    {
        GoogleMap1.Build();
    }
}
```

调用：

```csharp
//类的适配器模式
var baiduMap = new BaiduAdapter();
baiduMap.Gen();
//对象的适配器模式
var baiduMap1 = new BaiduAdapter1();
baiduMap1.Gen();
```

## reference

[C#设计模式之六适配器模式（Adapter Pattern）【结构型】](http://www.cnblogs.com/PatrickLiu/p/7660554.html)

[C#设计模式(7)——适配器模式（Adapter Pattern）](http://www.cnblogs.com/zhili/p/AdapterPattern.html)