# 责任链模式

某个请求需要多个对象进行处理，从而避免请求的发送者和接收之间的耦合关系。将这些对象连成一条链子，并沿着这条链子传递该请求，直到有对象处理它为止

```csharp
// 请假请求
public class LeaveRequest
{
    // 天数
    public double Days { get; set; }
    // 姓名
    public string Name { get; set; }
    public LeaveRequest(string name, int days)
    {
        Name = name;
        Days = days;
    }
}
// 审批人
public abstract class Approver
{
    public Approver NextApprover { get; set; }
    public string Name { get; set; }
    protected Approver(string name)
    {
        Name = name;
    }
    public abstract void ProcessRequest(LeaveRequest request);
}
/// <summary>
/// 项目管理者
/// </summary>
public class ProjectManager : Approver
{
    public ProjectManager(string name)
        : base(name)
    { }
    public override void ProcessRequest(LeaveRequest request)
    {
        if (request.Days <= 3)
        {
            Console.WriteLine(Name + "同意" + request.Name + "请假" + request.Days + "天");
        }
        else
        {
            NextApprover?.ProcessRequest(request);
        }
    }
}
/// <summary>
/// 部门管理者
/// </summary>
public class DepartManager : Approver
{
    public DepartManager(string name)
        : base(name)
    {
    }
    public override void ProcessRequest(LeaveRequest request)
    {
        if (request.Days <= 5)
        {
            Console.WriteLine(Name + "同意" + request.Name + "请假" + request.Days + "天");
        }
        else
        {
            NextApprover?.ProcessRequest(request);
        }
    }
}
/// <summary>
/// CEO
/// </summary>
public class Ceo : Approver
{
    public Ceo(string name)
        : base(name)
    { }
    public override void ProcessRequest(LeaveRequest request)
    {
        if (request.Days <= 10)
        {
            Console.WriteLine(Name + "同意" + request.Name + "请假" + request.Days + "天");
        }
        else
        {
            Console.WriteLine("需要讨论");
        }
    }
}
```

调用：

```csharp
var leaveRequest1 = new LeaveRequest("张三", 1);
var leaveRequest2 = new LeaveRequest("李四", 4);
var leaveRequest3 = new LeaveRequest("王五", 7);
var leaveRequest4 = new LeaveRequest("赵六", 11);
Approver projectManager = new ProjectManager("项目管理者");
Approver departManager = new DepartManager("部门管理者");
Approver ceo = new Ceo("CEO");
// 设置责任链
projectManager.NextApprover = departManager;
departManager.NextApprover = ceo;
// 处理请求
projectManager.ProcessRequest(leaveRequest1);
projectManager.ProcessRequest(leaveRequest2);
projectManager.ProcessRequest(leaveRequest3);
projectManager.ProcessRequest(leaveRequest4);
```

## reference

[C#设计模式之二十职责链模式（Chain of Responsibility Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/8109100.html)

[C#设计模式(21)——责任链模式](http://www.cnblogs.com/zhili/p/ChainOfResponsibity.html)
