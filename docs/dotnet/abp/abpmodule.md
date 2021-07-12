# ABP-Module

## 什么是Module？

Module就是模块化的设计思想。开发人员可以将自定义的功能以模块的形式集成到项目中。具体的功能也可以设计成一个单独的模块

## AbpModule

AbpModule是所有Module的基类。

## ABP如何发现Moudle

### 1. 程序入口调用：AbpBootstrapper.Initialize()

### 2. 通过入口的Moudle获取到所有互相依赖的Moudle

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

### 3. 注册所有Moudle

```C#
RegisterModules(moduleTypes);
```

### 4. 创建所有Module的描述信息

```C#
CreateModules(moduleTypes, plugInModuleTypes);
```

- AbpModule的基本信息放在AbpModuleInfo类中
- 多个AbpModuleInfo放在AbpModuleCollection集合中

### 5. 初始化所有Moudle

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
至此所有Moudle都被Abp框架集成了

## 如何把自己Moudle中的类和接口注册到abp框架中

比如AbpWebMvcModule这个模块，就是如何把Controller注册到Abp框架中

每个模块都有PreInitialize 和 Initialize方法

1. 在PreInitialize添加依赖关系
2. 在Initialize替换ControllerFactory

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

依赖关系表明：注册所有Controller

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

WindsorControllerFactory将替代DefaultControllerFactory

![20171216151343425120403.png](http://7xk2dp.com1.z0.glb.clouddn.com/20171216151343425120403.png)

从IOC容器中解析出Controller

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

初始化：这个方法一般是用来依赖注入的，一般调用IocManager.RegisterAssemblyByConvention实现。

### 3. PostInitialize

用来解析依赖关系。

### 4. Shutdown

当应用关闭以后，这个方法会被调用。

## 模块依赖

Abp框架会自动解析模块之间的依赖关系

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

AbpWebModule依赖于AbpWebCommonModule，AbpWebCommonModule会在AbpWebModule之前初始化

这两个模块启动的顺序为：

```C#
AbpWebCommonModule.PreInitialize();
AbpWebModule.PreInitialize();

AbpWebCommonModule.Initialize();
AbpWebModule.Initialize();

AbpWebCommonModule.PostInitialize();
AbpWebModule.PostInitialize();

```

> ABP先完成所有Module的PreInitialize，接着再执行所有Module的Initialize，最后执行PostInitialize。不是执行完一个Module的这三个方法，再去执行下一个Module的这三个方法

## 调用依赖模块

### 在AbpWebModule中如何调用AbpWebCommonModule中的方法？

在AbpWebModule中：

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

## abp底层框架的一些功能模块如何注册？

底层的模块都会依赖于AbpKernelModule，AbpKernelModule中主要初始化各种拦截器，如审计日志、多语言、工作单元拦截器等。

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

[ABP源码分析三：ABP Module](http://www.cnblogs.com/1zhk/p/5281458.html)