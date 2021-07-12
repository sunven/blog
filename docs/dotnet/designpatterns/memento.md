# 备忘录模式

在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样以后就可以把该对象恢复到原先的状态

```csharp
// 联系人--需要备份的数据，是状态数据，没有操作
public sealed class ContactPerson
{
    //姓名
    public string Name { get; set; }
    //电话号码
    public string MobileNumber { get; set; }
}
// 备份通讯录发起人
public sealed class MobileBackOriginator
{
    public List<ContactPerson> ContactPersonList { get; set; }
    //初始化需要备份的电话名单
    public MobileBackOriginator(List<ContactPerson> personList)
    {
        ContactPersonList = personList;
    }
    // 创建备忘录对象实例，将当期要保存的联系人列表保存到备忘录对象中
    public Memento CreateMemento()
    {
        return new Memento(new List<ContactPerson>(ContactPersonList));
    }
    // 将备忘录中的数据备份还原到联系人列表中
    public void RestoreMemento(Memento memento)
    {
        ContactPersonList = memento.ContactPersonListBack;
    }
    public void Show()
    {
        Console.WriteLine("联系人列表中共有{0}个人，他们是:", ContactPersonList.Count);
        foreach (ContactPerson p in ContactPersonList)
        {
            Console.WriteLine("姓名: {0} 号码: {1}", p.Name, p.MobileNumber);
        }
    }
}
// 备忘录对象，用于保存状态数据
public sealed class Memento
{
    // 保存发起人创建的电话名单数据
    public List<ContactPerson> ContactPersonListBack { get; }
    public Memento(List<ContactPerson> personList)
    {
        ContactPersonListBack = personList;
    }
}
// 管理角色，它可以管理【备忘录】对象
public sealed class MementoManager
{
    //如果想保存多个【备忘录】对象，可以通过字典或者堆栈来保存，堆栈对象可以反映保存对象的先后顺序
    public Memento ContactPersonMemento { get; set; }
}
```

调用：

```csharp
var persons= new List<ContactPerson>()
{
    new ContactPerson { Name="A", MobileNumber = "13533332222"},
    new ContactPerson { Name="B", MobileNumber = "13966554433"},
    new ContactPerson { Name="C", MobileNumber = "13198765544"}
};
//手机名单发起人
var mobileOriginator = new MobileBackOriginator(persons);
mobileOriginator.Show();
// 创建备忘录并保存备忘录对象
var manager = new MementoManager {ContactPersonMemento = mobileOriginator.CreateMemento()};
// 更改发起人联系人列表
Console.WriteLine("----移除最后一个联系人--------");
mobileOriginator.ContactPersonList.RemoveAt(2);
mobileOriginator.Show();
// 恢复到原始状态
Console.WriteLine("-------恢复联系人列表------");
mobileOriginator.RestoreMemento(manager.ContactPersonMemento);
mobileOriginator.Show();
```

## reference

[C#设计模式之二十二备忘录模式（Memento Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/8176974.html)

[C#设计模式(23)——备忘录模式（Memento Pattern）](http://www.cnblogs.com/zhili/p/MementoPattern.html)