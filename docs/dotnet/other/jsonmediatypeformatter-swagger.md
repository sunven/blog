# JsonMediaTypeFormatter和Swagger

使用JsonMediaTypeFormatter是为了让long类型的字段都以字符串格式输出

## 方法一

WebApiConfig中增加

```csharp
var jsonFormatter = new JsonMediaTypeFormatter();
var settings = jsonFormatter.SerializerSettings;
settings.Converters.Add(new LongToStringConverter());
config.Services.Replace(typeof(IContentNegotiator), new JsonContentNegotiator(jsonFormatter));
```

JsonContentNegotiator类

```csharp
public class JsonContentNegotiator : IContentNegotiator
{
    private readonly JsonMediaTypeFormatter _jsonFormatter;
    public JsonContentNegotiator(JsonMediaTypeFormatter formatter)
    {
        _jsonFormatter = formatter;
    }
    public ContentNegotiationResult Negotiate(Type type, HttpRequestMessage request, IEnumerable<MediaTypeFormatter> formatters)
    {
        var result = new ContentNegotiationResult(_jsonFormatter, new MediaTypeHeaderValue("application/json"));
        return result;
    }
}
```

LongToStringConverter类

```csharp
public class LongToStringConverter : Newtonsoft.Json.JsonConverter
{
    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        var jt = JToken.ReadFrom(reader);
        return jt.Value<long>();
    }
    public override bool CanConvert(Type objectType)
    {
        return typeof(long) == objectType;
    }
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        serializer.Serialize(writer, value.ToString());
    }
}
```

> 这种方法会导致Swagger文档不能打开（js报错）

## 方法二

```csharp
var defaultSettings = new JsonSerializerSettings
{
    Formatting = Formatting.Indented,
    ContractResolver = new CamelCasePropertyNamesContractResolver(),
    Converters = new List<JsonConverter>{ new LongToStringConverter() }
};
JsonConvert.DefaultSettings = () => defaultSettings;
config.Formatters.Clear();
config.Formatters.Add( new JsonMediaTypeFormatter() );
config.Formatters.JsonFormatter.SerializerSettings = defaultSettings;
```