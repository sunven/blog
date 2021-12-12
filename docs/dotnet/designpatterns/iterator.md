# 迭代器模式

提供了一种方法顺序访问一个聚合对象（理解为集合对象）中各个元素，而又无需暴露该对象的内部表示，这样既可以做到不暴露集合的内部结构，又可让外部代码透明地访问集合内部的数据

```csharp
// 迭代器抽象类
public interface ITerator
{
    bool MoveNext();
    Object GetCurrent();
    void Next();
    void Reset();
}
// 抽象聚合类
public interface ICollection
{
    ITerator GetIterator();
}
// 具体聚合类
public class Collection : ICollection
{
    readonly int[] _collection;
    public Collection()
    {
        _collection = new [] { 2, 4, 6, 8 };
    }
    public ITerator GetIterator()
    {
        return new Iterator(this);
    }
    public int Length => _collection.Length;
    public int GetElement(int index)
    {
        return _collection[index];
    }
}
// 具体迭代器类
public class Iterator : ITerator
{
    private readonly Collection _list;
    private int _index;
    public Iterator(Collection list)
    {
        _list = list;
        _index = 0;
    }
    public bool MoveNext()
    {
        return _index < _list.Length;
    }
    public object GetCurrent()
    {
        return _list.GetElement(_index);
    }
    public void Reset()
    {
        _index = 0;
    }
    public void Next()
    {
        if (_index < _list.Length)
        {
            _index++;
        }
    }
}
```

调用：

```csharp
ICollection list = new Collection();
var iterator = list.GetIterator();
while (iterator.MoveNext())
{
    var j = (int)iterator.GetCurrent();
    Console.WriteLine(j.ToString());
    iterator.Next();
}
```

## reference

[C#设计模式之十五迭代器模式（Iterator Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/7903617.html)

[C#设计模式(16)——迭代器模式（Iterator Pattern）](http://www.cnblogs.com/zhili/p/IteratorPattern.html)
