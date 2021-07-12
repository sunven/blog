# NuGet更改包及缓存目录

查看文件夹位置

```
dotnet nuget locals all --list
```

```
<config>
    <add key="dependencyVersion" value="Highest" />
    <add key="globalPackagesFolder" value="c:\packages" />
    <add key="repositoryPath" value="c:\installed_packages" />
    <add key="http_proxy" value="http://company-squid:3128@contoso.com" />
</config>
```

默认global‑packages位置

```
%userprofile%\.nuget\packages
```

全局NuGet.Config位置

```
%APPDATA%\NuGet\NuGet.Config
```

修改global‑packages路径

```
<configuration>
  <config>
     <add key="globalPackagesFolder" value="D:\Packages\NuGet\global-packages" />
  </config>
</configuration>
```