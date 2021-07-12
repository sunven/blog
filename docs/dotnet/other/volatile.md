# volatile

```csharp
private static volatile bool _complete;

private static void Main()
{
    var t = new Thread(() =>
    {
        var toggle = false;
        while (!_complete)
        {
            toggle = !toggle;
        }
    });
    t.Start();
    Thread.Sleep(1000); //让其他线程起来
    _complete = true;
    t.Join(); // 不使用volatile则会无线阻止
}
```

**Release下编译**

## reference

[Volatile keyword in C# – memory model explained](http://igoro.com/archive/volatile-keyword-in-c-memory-model-explained/)

[Memory Barriers and Volatility](http://www.albahari.com/threading/part4.aspx#_Memory_Barriers_and_Volatility)