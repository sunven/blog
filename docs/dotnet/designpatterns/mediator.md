# 中介者模式

定义一个中介对象来封装一系列对象之间的交互关系。中介者使各个对象之间不需要显式地相互引用，从而使耦合性降低，而且可以独立地改变它们之间的交互行为

```csharp
// 淘宝用户抽象类
public abstract class TbUser
{
    public int MoneyCount { get; set; }
    protected TbUser()
    {
        MoneyCount = 0;
    }
    public abstract void MoneyChange(int count, Mediator mediator);
}
// 买家
public class Buyer : TbUser
{
    // 依赖与抽象中介者对象
    public override void MoneyChange(int count, Mediator mediator)
    {
        mediator.BuyerMoneyChange(count);
    }
}
// 卖家
public class Seller : TbUser
{
    // 依赖与抽象中介者对象
    public override void MoneyChange(int count, Mediator mediator)
    {
        mediator.SellerMoneyChange(count);
    }
}
public abstract class Mediator
{
    protected TbUser Buyer;
    protected TbUser Seller;
    protected Mediator(TbUser buyer, TbUser seller)
    {
        Buyer = buyer;
        Seller = seller;
    }
    public abstract void BuyerMoneyChange(int count);
    public abstract void SellerMoneyChange(int count);
}
public class MediatorImp : Mediator
{
    public MediatorImp(TbUser buyer, TbUser seller) : base(buyer, seller)
    {
    }
    public override void BuyerMoneyChange(int count)
    {
        Console.WriteLine("买家买东西");
        Buyer.MoneyCount -= count;
        Seller.MoneyCount += count;
        Console.WriteLine(Buyer.MoneyCount);
    }
    public override void SellerMoneyChange(int count)
    {
        Console.WriteLine("卖家退货");
        Seller.MoneyCount -= count;
        Buyer.MoneyCount += count;
        Console.WriteLine(Seller.MoneyCount);
    }
}
```

调用：

```csharp
var buyer = new Buyer();
var seller = new Seller();
var mediator = new MediatorImp(buyer, seller);
buyer.MoneyChange(5, mediator);
seller.MoneyChange(10, mediator);
```

## reference

[C#设计模式之十七中介者模式（Mediator Pattern）【行为型】](http://www.cnblogs.com/PatrickLiu/p/7966240.html)

[C#设计模式(18)——中介者模式（Mediator Pattern）](http://www.cnblogs.com/zhili/p/MediatorPattern.html)
