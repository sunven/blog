# 设计原则

## SRP(Single Responsibilities Principle)

## OCP(Open-Close Principle)

## LSP(Liskov Substitution Principle)

> 使用基类对象指针或引用的函数必须能够在不了解衍生类的条件下使用衍生类的对象
如果对每一个类型为T1的对象o1，都有类型为T2的对象o2，使得以T1定义的所有程序P在所有的对象o1都换成o2时，程序P的行为没有变化，那么类型T2是类型T1的子类型
子类可以扩展父类的功能，但不能改变父类原有的功能

1. 子类可以实现父类的抽象方法，但是不能覆盖父类的非抽象方法。
2. 子类中可以增加自己特有的方法。
3. 当子类覆盖或实现父类的方法时，方法的前置条件（即方法的形参）要比父类方法的输入参数更宽松。
4. 当子类的方法实现父类的抽象方法时，方法的后置条件（即方法的返回值）要比父类更严格。

### reference

[里氏替换原则（Liskov Substitution Principle）](http://www.cnblogs.com/gaochundong/p/liskov_substitution_principle.html)

[设计模式六大原则（2）：里氏替换原则](http://www.cnblogs.com/hellojava/archive/2013/03/15/2960905.html)

## DIP(Dependence Inversion Principle)

## ISP(Interface Segregation Principle)

## CRP(Composite Reuse Principle)

## LoD(Law of Demeter) LKP(Least Knowledge Principle)
