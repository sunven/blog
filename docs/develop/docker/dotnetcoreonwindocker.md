# windows下docker与.net core 的简单示例

## 一 windows 下安装docker

## 二 .net core 项目

1. 新建一个空的ASP.NET Core Web 应用程序
2. 在该项目的目录下执行`dotnet publish`,可以看到在`bin\Debug\netcoreapp2.1`目录下生成`publish`
3. 在`publish`目录下执行`dotnet WebApplication1.dll`可以运行项目

主要代码如下：

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args)
    {
        return WebHost.CreateDefaultBuilder(args)
            .UseKestrel()
            .UseUrls("http://*:5001")
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseStartup<Startup>()
            .Build();
    }
}
```

## 三 镜像

### 在publish目录下新建Dockerfile文件

```
# 基于microsoft/dotnet:latest构建Docker Image
FROM microsoft/dotnet:latest
 
# 进入docker中的/usr/local/src目录
RUN cd /usr/local/src
 
# 创建WebApplication1目录
RUN mkdir WebApplication1
 
# 设置工作路径
WORKDIR /usr/local/src/WebApplication1
 
# 将当前文件夹下的所有文件全部复制到工作目录
COPY *.* ./
 
# 向外界暴露5001端口
EXPOSE 5001
 
# 执行dotnet WebApplication1.dll命令
CMD ["dotnet", "WebApplication1.dll"]
```

### 生成镜像

```
docker build -t core/docker .
```

core/docker可以理解为名称

如果是第一次生成，由于需要下载microsoft/dotnet:latest这个Docker Image作为基础Image

### 运行

把装好的docker运行起来，执行以下命令：

```
docker run -it -p 8001:5001 core/docker
```

- -it参数表示需要提供一个模拟的shell环境，并要求有用户交互功能，这样当我们按下Ctrl+C的时候，就可以停止我们的应用程序
- -p 8001:5001参数表示需要将Docker Container的5001端口映射到主机环境的8001端口，也就是客户端可以直接通过8001端口访问我们的应用程序
- core/docker参数指定了需要运行的Docker Image。此处采用默认的latest标签

```
docker ps //运行该命令可以查看所有容器，包括刚才运行的core/docker
```


#### 错误解决

```
Error:
  An assembly specified in the application dependencies manifest (WebApplication1.deps.json) was not found:
    package: 'System.Data.SqlClient', version: '4.4.3'
    path: 'runtimes/unix/lib/netstandard2.0/System.Data.SqlClient.dll'
```
依赖的版本与实际引用的版本不相同，更细到最新的dotcore，再更新nuget

## reference

[在docker中运行ASP.NET Core Web API应用程序](http://www.cnblogs.com/daxnet/p/5782019.html)

[Docker容器环境下ASP.NET Core Web API应用程序的调试](http://www.cnblogs.com/daxnet/p/5793479.html)