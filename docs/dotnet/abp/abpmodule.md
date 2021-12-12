# ABP-Module

## 什么是 Module？

Module 就是模块化的设计思想。开发人员可以将自定义的功能以模块的形式集成到项目中。具体的功能也可以设计成一个单独的模块

## AbpModule

AbpModule 是所有 Module 的基类。

## ABP 如何发现 Moudle

### 1. 程序入口调用：AbpBootstrapper.Initialize()

### 2. 通过入口的 Moudle 获取到所有互相依赖的 Moudle

```C#
private static void AddModuleAndDependenciesRecursively(List<Type> modules, Type module)
{
    if (!IsAbpModule(module))
    {
        throw new AbpInitializationException("This type is not an ABP module: " + module.AssemblyQualifiedName);
    }

    if (modules.Contains(module))
    {
        return;
    }

    modules.Add(module);

    var dependedModules = FindDependedModuleTypes(module);
    foreach (var dependedModule in dependedModules)
    {
        AddModuleAndDependenciesRecursively(modules, dependedModule);
    }
}

/// <summary>
/// Finds direct depended modules of a module (excluding given module).
/// </summary>
public static List<Type> FindDependedModuleTypes(Type moduleType)
{
    if (!IsAbpModule(moduleType))
    {
        throw new AbpInitializationException("This type is not an ABP module: " + moduleType.AssemblyQualifiedName);
    }

    var list = new List<Type>();

    if (moduleType.GetTypeInfo().IsDefined(typeof(DependsOnAttribute), true))
    {
        var dependsOnAttributes = moduleType.GetTypeInfo().GetCustomAttributes(typeof(DependsOnAttribute), true).Cast<DependsOnAttribute>();
        foreach (var dependsOnAttribute in dependsOnAttributes)
        {
            foreach (var dependedModuleType in dependsOnAttribute.DependedModuleTypes)
            {
                list.Add(dependedModuleType);
            }
        }
    }

    return list;
}
```

### 3. 注册所有 Moudle

```C#
RegisterModules(moduleTypes);
```

### 4. 创建所有 Module 的描述信息

```C#
CreateModules(moduleTypes, plugInModuleTypes);
```

- AbpModule 的基本信息放在 AbpModuleInfo 类中
- 多个 AbpModuleInfo 放在 AbpModuleCollection 集合中

### 5. 初始化所有 Moudle

```C#
public virtual void StartModules()
{
    var sortedModules = _modules.GetSortedModuleListByDependency();
    sortedModules.ForEach(module => module.Instance.PreInitialize());
    sortedModules.ForEach(module => module.Instance.Initialize());
    sortedModules.ForEach(module => module.Instance.PostInitialize());
}
```

> 由于模块有依赖关系存在，所以初始化之前确定好初始化顺序，即：被依赖的模块要在依赖的模块之前初始化
> 至此所有 Moudle 都被 Abp 框架集成了

## 如何把自己 Moudle 中的类和接口注册到 abp 框架中

比如 AbpWebMvcModule 这个模块，就是如何把 Controller 注册到 Abp 框架中

每个模块都有 PreInitialize 和 Initialize 方法

1. 在 PreInitialize 添加依赖关系
2. 在 Initialize 替换 ControllerFactory

```C#
/// <summary>
/// This module is used to build ASP.NET MVC web sites using Abp.
/// </summary>
[DependsOn(typeof(AbpWebModule))]
public class AbpWebMvcModule : AbpModule
{
    /// <inheritdoc/>
    public override void PreInitialize()
    {
        //添加依赖关系
        IocManager.AddConventionalRegistrar(new ControllerConventionalRegistrar());

        IocManager.Register<IAbpMvcConfiguration, AbpMvcConfiguration>();

        Configuration.ReplaceService<IAbpAntiForgeryManager, AbpMvcAntiForgeryManager>();
    }

    /// <inheritdoc/>
    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        //用WindsorControllerFactory替换MVC下默认的ControllerFactory
        //MVC将使用WindsorControllerFactory从IOC容器中解析出controller
        ControllerBuilder.Current.SetControllerFactory(new WindsorControllerFactory(IocManager));
        HostingEnvironment.RegisterVirtualPathProvider(IocManager.Resolve<EmbeddedResourceVirtualPathProvider>());
    }
}
```

依赖关系表明：注册所有 Controller

```C#
/// <summary>
/// Registers all MVC Controllers derived from <see cref="Controller"/>.
/// </summary>
public class ControllerConventionalRegistrar : IConventionalDependencyRegistrar
{
    /// <inheritdoc/>
    public void RegisterAssembly(IConventionalRegistrationContext context)
    {
        //注册所有Controller
        context.IocManager.IocContainer.Register(
            Classes.FromAssembly(context.Assembly)
                .BasedOn<Controller>()
                .If(type => !type.GetTypeInfo().IsGenericTypeDefinition)
                .LifestyleTransient()
            );
    }
}
```

WindsorControllerFactory 将替代 DefaultControllerFactory

![20171216151343425120403.png](http://7xk2dp.com1.z0.glb.clouddn.com/20171216151343425120403.png)

从 IOC 容器中解析出 Controller

```C#
/// <summary>
/// This class is used to allow MVC to use dependency injection system while creating MVC controllers.
/// </summary>
public class WindsorControllerFactory : DefaultControllerFactory
{
    /// <summary>
    /// Reference to DI kernel.
    /// </summary>
    private readonly IIocResolver _iocManager;

    /// <summary>
    /// Creates a new instance of WindsorControllerFactory.
    /// </summary>
    /// <param name="iocManager">Reference to DI kernel</param>
    public WindsorControllerFactory(IIocResolver iocManager)
    {
        _iocManager = iocManager;
    }

    /// <summary>
    /// Called by MVC system and releases/disposes given controller instance.
    /// </summary>
    /// <param name="controller">Controller instance</param>
    public override void ReleaseController(IController controller)
    {
        _iocManager.Release(controller);
    }

    /// <summary>
    /// Called by MVC system and creates controller instance for given controller type.
    /// </summary>
    /// <param name="requestContext">Request context</param>
    /// <param name="controllerType">Controller type</param>
    /// <returns></returns>
    protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
    {
        if (controllerType == null)
        {
            return base.GetControllerInstance(requestContext, controllerType);
        }

        return _iocManager.Resolve<IController>(controllerType);
    }
}
```

## 模块的生命周期

### 1. PreInitialize

初始化之前：当应用启动后会首先调用这个方法，在依赖注入之前。

### 2. Initialize

初始化：这个方法一般是用来依赖注入的，一般调用 IocManager.RegisterAssemblyByConvention 实现。

### 3. PostInitialize

用来解析依赖关系。

### 4. Shutdown

当应用关闭以后，这个方法会被调用。

## 模块依赖

Abp 框架会自动解析模块之间的依赖关系

```C#
[DependsOn(typeof(AbpWebCommonModule))]
public class AbpWebModule : AbpModule
{
    /// <inheritdoc/>
    public override void Initialize()
    {
        //依赖注入
        IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
    }
}

```

AbpWebModule 依赖于 AbpWebCommonModule，AbpWebCommonModule 会在 AbpWebModule 之前初始化

这两个模块启动的顺序为：

```C#
AbpWebCommonModule.PreInitialize();
AbpWebModule.PreInitialize();

AbpWebCommonModule.Initialize();
AbpWebModule.Initialize();

AbpWebCommonModule.PostInitialize();
AbpWebModule.PostInitialize();

```

> ABP 先完成所有 Module 的 PreInitialize，接着再执行所有 Module 的 Initialize，最后执行 PostInitialize。不是执行完一个 Module 的这三个方法，再去执行下一个 Module 的这三个方法

## 调用依赖模块

### 在 AbpWebModule 中如何调用 AbpWebCommonModule 中的方法？

在 AbpWebModule 中：

```C#
private readonly abpWebCommonModule _abpWebCommonModule;

public AbpWebModule(AbpWebCommonModule abpWebCommonModule)
{
    _abpWebCommonModule = abpWebCommonModule;
}

public override void PreInitialize()
{
    //调用abpWebCommonModule中的方法。
    //_abpWebCommonModule.
}
```

## abp 底层框架的一些功能模块如何注册？

底层的模块都会依赖于 AbpKernelModule，AbpKernelModule 中主要初始化各种拦截器，如审计日志、多语言、工作单元拦截器等。

```C#
public override void PreInitialize()
{
    IocManager.AddConventionalRegistrar(new BasicConventionalRegistrar());

    IocManager.Register<IScopedIocResolver, ScopedIocResolver>(DependencyLifeStyle.Transient);
    IocManager.Register(typeof(IAmbientScopeProvider<>), typeof(DataContextAmbientScopeProvider<>), DependencyLifeStyle.Transient);

    AddAuditingSelectors();
    AddLocalizationSources();
    AddSettingProviders();
    AddUnitOfWorkFilters();
    ConfigureCaches();
    AddIgnoredTypes();
}
```

## Reference

[ABP 源码分析三：ABP Module](http://www.cnblogs.com/1zhk/p/5281458.html)
