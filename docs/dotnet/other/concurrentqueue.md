# ConcurrentQueue

`先进先出 (FIFO)` `线程安全`

```csharp
ConcurrentQueue<int> cq = new ConcurrentQueue<int>();

// 填充队列
for (int i = 0; i < 10000; i++)
{
    cq.Enqueue(i);
}

if (!cq.TryPeek(out int result))
{
    //尝试返回第一个
    Console.WriteLine("失败");
}
else if (result != 0)
{
    Console.WriteLine("应该是0");
}

int outerSum = 0;
void action()
{
    int localSum = 0;
    while (cq.TryDequeue(out int localValue))
    {
        localSum += localValue;
    }
    Interlocked.Add(ref outerSum, localSum);
}

// 用4个并发
Parallel.Invoke(action, action, action, action);
Console.WriteLine("和:{0}", outerSum);
Console.ReadKey();
```
