# Swagger的简单使用

## basic auth

```csharp
c.OperationFilter<AddAuthorizationHeaderParameterOperationFilter>();
```

```csharp
public class AddAuthorizationHeaderParameterOperationFilter : IOperationFilter
{
    public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
    {
        var filterPipeline = apiDescription.ActionDescriptor.GetFilterPipeline();
        var isAuthorized = filterPipeline.Select(filterInfo => filterInfo.Instance)
            .Any(filter => filter is IAuthorizationFilter);

        var allowAnonymous =
            apiDescription.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any();

        if (isAuthorized && !allowAnonymous)
        {
            if (operation.parameters == null)
                operation.parameters = new List<Parameter>();

            operation.parameters?.Add(new Parameter
            {
                name = "Authorization",
                @in = "header",
                description = "Basic HTTP Base64 encoded Header Authorization",
                required = true,
                type = "string"
            });
        }
    }
}

```

[http basic auth with swashbuckle api documentation
](https://stackoverflow.com/questions/30222117/http-basic-auth-with-swashbuckle-api-documentation)

## SwaggerGenerator

```csharp
c.CustomProvider((defaultProvider) => new CachingSwaggerProvider(defaultProvider));
```

```csharp
public class CachingSwaggerProvider : ISwaggerProvider
{
    private static ConcurrentDictionary<string, SwaggerDocument> _cache =
        new ConcurrentDictionary<string, SwaggerDocument>();

    private readonly ISwaggerProvider _swaggerProvider;

    public CachingSwaggerProvider(ISwaggerProvider swaggerProvider)
    {
        _swaggerProvider = swaggerProvider;
    }

    public SwaggerDocument GetSwagger(string rootUrl, string apiVersion)
    {
        var cacheKey = string.Format("{0}_{1}", rootUrl, apiVersion);
        if (!_cache.TryGetValue(cacheKey, out SwaggerDocument srcDoc))
        {
            srcDoc = _swaggerProvider.GetSwagger(rootUrl, apiVersion);
            //解决IApiExplorer读取接口错误的问题
            ApiXmlDesc ApiXmlDesc = ApiXmlPath.GetAllApiPath();

            //求交集
            srcDoc.paths = (
                            from p in srcDoc.paths
                            join q in ApiXmlDesc.MethodList
                            on p.Key.Substring(0, p.Key.LastIndexOf("/")) equals q
                            select p
                           ).Union(
                            from p in srcDoc.paths
                            join q in ApiXmlDesc.MethodList
                            on p.Key equals q
                            select p
                        ).OrderBy(e => e.Key).ToDictionary(e => e.Key, e => e.Value);
            //srcDoc.paths = ApiXmlDesc.MethodList;
            srcDoc.vendorExtensions = new Dictionary<string, object> { { "ControllerDesc", ApiXmlDesc.ControllerList } };
            _cache.TryAdd(cacheKey, srcDoc);
        }
        return srcDoc;
    }
}
```

[webapi文档描述-swagger](webapi文档描述-swagger)

## DocumentFilter

```csharp
c.DocumentFilter<SwaggerAreasSupportDocumentFilter>();
```

[https://github.com/jianxuanbing/SwashbuckleEx/blob/master/SwashbuckleEx.WebApiTest/Selectors/SwaggerAreasSupportDocumentFilter.cs](https://github.com/jianxuanbing/SwashbuckleEx/blob/master/SwashbuckleEx.WebApiTest/Selectors/SwaggerAreasSupportDocumentFilter.cs)

[Swagger 增加 DocumentFilter 隐藏不需要显示的接口](https://www.cnblogs.com/kellynic/p/6092879.html)

## reference

[Webapi文档描述-swagger优化](http://www.cnblogs.com/jianxuanbing/p/7376757.html)

[https://github.com/jianxuanbing/SwashbuckleEx](https://github.com/jianxuanbing/SwashbuckleEx)
