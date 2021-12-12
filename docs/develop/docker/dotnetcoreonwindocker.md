# windows 下 docker 与.net core 的简单示例

## 一 windows 下安装 docker

## 二 .net core 项目

1. 新建一个空的 ASP.NET Core Web 应用程序
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

### 在 publish 目录下新建 Dockerfile 文件

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

core/docker 可以理解为名称

如果是第一次生成，由于需要下载 microsoft/dotnet:latest 这个 Docker Image 作为基础 Image

### 运行

把装好的 docker 运行起来，执行以下命令：

```
docker run -it -p 8001:5001 core/docker
```

- -it 参数表示需要提供一个模拟的 shell 环境，并要求有用户交互功能，这样当我们按下 Ctrl+C 的时候，就可以停止我们的应用程序
- -p 8001:5001 参数表示需要将 Docker Container 的 5001 端口映射到主机环境的 8001 端口，也就是客户端可以直接通过 8001 端口访问我们的应用程序
- core/docker 参数指定了需要运行的 Docker Image。此处采用默认的 latest 标签

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

依赖的版本与实际引用的版本不相同，更细到最新的 dotcore，再更新 nuget

## reference

[在 docker 中运行 ASP.NET Core Web API 应用程序](http://www.cnblogs.com/daxnet/p/5782019.html)

[Docker 容器环境下 ASP.NET Core Web API 应用程序的调试](http://www.cnblogs.com/daxnet/p/5793479.html)
