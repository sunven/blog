# 审计日志中的AOP

审计跟踪（也称为审核日志）是一个安全相关的时间顺序记录，记录这些记录的目的是为已经影响在任何时候的详细操作，提供程序运行的证明文件记录、源或事件

## MVC

自定义一个过滤器

```csharp
public class AuditFilter : IActionFilter
{
    /// <summary>
    ///     在执行操作方法后调用。
    /// </summary>
    /// <param name="filterContext"></param>
    public void OnActionExecuted(ActionExecutedContext filterContext)
    {
        var auditData = AbpAuditFilterData.GetOrNull(filterContext.HttpContext);
        if (auditData == null)
            return;
        auditData.Stopwatch.Stop();
        var path = AppDomain.CurrentDomain.BaseDirectory + "log.txt";
        if (filterContext.Exception != null)
            File.AppendAllText(path,
                DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "异常：" + filterContext.Exception + "\r\n");
        else
            File.AppendAllText(path,
                DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "耗时：" +
                Convert.ToInt32(auditData.Stopwatch.Elapsed.TotalMilliseconds) + "\r\n");
    }
    /// <summary>
    ///     在执行操作方法之前调用。
    /// </summary>
    /// <param name="filterContext"></param>
    public void OnActionExecuting(ActionExecutingContext filterContext)
    {
        var actionStopwatch = Stopwatch.StartNew();
        AbpAuditFilterData.Set(
            filterContext.HttpContext,
            new AbpAuditFilterData(actionStopwatch)
        );
    }
}
```

定义一个数据存储

```csharp
public class AbpAuditFilterData
{
    private const string AbpAuditFilterDataHttpContextKey = "__AbpAuditFilterData";


    public AbpAuditFilterData(
        Stopwatch stopwatch)
    {
        Stopwatch = stopwatch;
    }

    public Stopwatch Stopwatch { get; }

    public static void Set(HttpContextBase httpContext, AbpAuditFilterData auditFilterData)
    {
        GetAuditDataStack(httpContext).Push(auditFilterData);
    }

    public static AbpAuditFilterData GetOrNull(HttpContextBase httpContext)
    {
        var stack = GetAuditDataStack(httpContext);
        return stack.Count <= 0
            ? null
            : stack.Pop();
    }

    /// <summary>
    ///     获取一个可变大小的后进先出 (LIFO) 集合
    /// </summary>
    /// <param name="httpContext"></param>
    /// <returns></returns>
    private static Stack<AbpAuditFilterData> GetAuditDataStack(HttpContextBase httpContext)
    {
        if (httpContext.Items[AbpAuditFilterDataHttpContextKey] is Stack<AbpAuditFilterData> stack)
            return stack;
        stack = new Stack<AbpAuditFilterData>();
        httpContext.Items[AbpAuditFilterDataHttpContextKey] = stack;
        return stack;
    }
}
```

HomeController 如下

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        var a = 0;
        for (var i = 0; i < 10000; i++)
            for (var j = 0; j < 10000; j++)
                a = i - j;
        ViewBag.A = a;
        return View();
    }

    public ActionResult About()
    {
        var a = Convert.ToInt32("a");
        ViewBag.Message = "Your application description page.";

        return View();
    }
}
```

访问home/index 日志记录如下：

`2018-01-22 19:11:09耗时：342`

访问home/about 日志记录如下：

![image](http://7xk2dp.com1.z0.glb.clouddn.com/AuditingMvcDemo01201801221918482115.png)

## Web Api

自定义过滤器

```csharp
public class AuditFilter : IActionFilter
{
    //
    // 摘要:
    //     获取或设置一个值，该值指示是否可以为单个程序元素指定多个已指示特性的实例。
    //
    // 返回结果:
    //     如果可以指定多个实例，则为 true；否则为 false。默认值为 false。
    public bool AllowMultiple => false;

    /// <summary>
    /// 异步执行筛选器操作
    /// </summary>
    /// <param name="actionContext"></param>
    /// <param name="cancellationToken"></param>
    /// <param name="continuation"></param>
    /// <returns></returns>
    public async Task<HttpResponseMessage> ExecuteActionFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
    {
        var method = actionContext.ActionDescriptor is ReflectedHttpActionDescriptor descriptor ? descriptor.MethodInfo : null;
        var str = $"{actionContext.ActionDescriptor.ControllerDescriptor.ControllerType.Name}/{method?.Name}/{JsonConvert.SerializeObject(actionContext.ActionArguments)}";


        var stopwatch = Stopwatch.StartNew();
        var path = AppDomain.CurrentDomain.BaseDirectory + "log.txt";
        try
        {
            return await continuation();
        }
        catch (Exception ex)
        {
            File.AppendAllText(path,
                DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + str + "异常：" + ex + "\r\n");
            throw;
        }
        finally
        {
            stopwatch.Stop();
            File.AppendAllText(path,
                DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + str + "耗时：" +
                Convert.ToInt32(stopwatch.Elapsed.TotalMilliseconds) + "\r\n");
        }
    }
}
```

ValuesController代码如下

```csharp
public class ValuesController : ApiController
{
    // GET api/values
    public IEnumerable<string> Get()
    {
        Thread.Sleep(new Random().Next(500, 1000));
        return new[] { "Get" };
    }

    // GET api/values/5
    public string Get(int id)
    {
        Thread.Sleep(new Random().Next(500, 1000));
        return id + "";
    }

    [Route("api/values/GetError")]
    public void GetError()
    {
        var a = Convert.ToInt32("a");
    }
}
```

访问api/values 日志记录如下

`2018-01-22 19:23:27 ValuesController/Get/{}耗时：978`

访问api/values/1 日志记录如下

`2018-01-22 19:24:21 ValuesController/Get/{"id":1}耗时：727`

访问api/values/GetError 日志记录如下

![image](http://7xk2dp.com1.z0.glb.clouddn.com/AuditingWebApiDemo01201801221930484522.png)

## Unity

自定义一个拦截器

```csharp
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class | AttributeTargets.Interface)]
public class UnityAopAttribute : HandlerAttribute, ICallHandler
{
    public override ICallHandler CreateHandler(IUnityContainer container)
    {
        return this;
    }

    public IMethodReturn Invoke(IMethodInvocation input, GetNextHandlerDelegate getNext)
    {
        var s = new Stopwatch();
        s.Start();
        var result = getNext()(input, getNext);
        if (result.Exception != null)
        {
            WriteLog(result.Exception.ToString());
            //表示处理异常 Unity就不会抛出
            result.Exception = null;
        }
        s.Stop();
        WriteLog("方法：{0},参数：{1},耗时：{2}",
            input.MethodBase.Name, JsonConvert.SerializeObject(input.Arguments), s.Elapsed.TotalMilliseconds);
        return result;
    }

    private void WriteLog(string format, params object[] arg)
    {
        var path = AppDomain.CurrentDomain.BaseDirectory + "log.txt";
        File.AppendAllText(path, string.Format(format, arg) + "\r\n");
    }

    public IEnumerable<Type> GetRequiredInterfaces()
    {
        return Type.EmptyTypes;
    }

    public bool WillExecute => false;
}
```

接口定义如下

```csharp
public interface IOrderService
{
    string GetOrder();

    string GetOrderDetail();
}
```

实现如下

加上UnityAop标记

```csharp
[UnityAop]
public class OrderService : IOrderService
{
    public string GetOrder()
    {
        Thread.Sleep(new Random().Next(500, 1000));
        return "GetOrder";
    }

    public string GetOrderDetail()
    {
        var i = Convert.ToInt32("a");
        return i + "GetOrder";
    }
}
```

注入及调用如下

![image](http://7xk2dp.com1.z0.glb.clouddn.com/UnityDemo01201801231017117225.png)

示例代码：[https://github.com/sunven/Abp1](https://github.com/sunven/Abp1)

## Reference

[Unity AOP 处理异常的方法](http://www.cnblogs.com/1-2-3/archive/2009/11/18/unity-aop-exception.html)