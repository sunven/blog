# c++ self-test

## 函数重载

```cpp
class printData
{
public:
    void print(int i)
    {
        cout << "a: " << i << endl;
    }

    void print(double f)
    {
        cout << "b: " << f << endl;
    }

    void print(char c[])
    {
        cout << "c: " << c << endl;
    }
};

// 程序的主函数
int main()
{
    printData p;
    p.print(1);   //1
    p.print(1.1); //1.1
    p.print('a'); //97
}
```

## 运算符重载

```cpp
class Box
{
public:
    void setLength(double len)
    {
        length = len;
    }
    // 重载 + 运算符，用于把两个 Box 对象相加
    Box operator+(const Box &b)
    {
        Box box;
        box.length = this->length + b.length;
        return box;
    }

    void printLength()
    {
        cout << length << endl;
    }

private:
    double length; // 长度
};
// 程序的主函数
int main()
{
    Box Box1; // 声明 Box1，类型为 Box
    Box Box2; // 声明 Box2，类型为 Box
    Box Box3; // 声明 Box3，类型为 Box

    // Box1 详述
    Box1.setLength(6.0);

    // Box2 详述
    Box2.setLength(12.0);

    // 把两个对象相加，得到 Box3
    Box3 = Box1 + Box2;
    Box3.printLength(); //18
    return 0;
}
```

## 拷贝构造函数

```cpp
class Line
{
public:
    Line(int len);         // 简单的构造函数
    Line(const Line &obj); // 拷贝构造函数

private:
    int *ptr;
};

// 成员函数定义，包括构造函数
Line::Line(int len)
{
    cout << "调用构造函数" << endl;
    // 为指针分配内存
    ptr = new int;
    *ptr = len;
}

Line::Line(const Line &obj)
{
    cout << "调用拷贝构造函数并为指针 ptr 分配内存" << endl;
    ptr = new int;
    *ptr = *obj.ptr; // 拷贝值
}

// 程序的主函数
int main()
{
    Line line1(10);
    Line line2 = line1; // 这里也调用了拷贝构造函数
    return 0;
}
```

## 友元函数

```cpp
class Box
{
    double width;

public:
    friend void printWidth(Box box);
    void setWidth(double wid);
};

// 成员函数定义
void Box::setWidth(double wid)
{
    width = wid;
}

// 请注意：printWidth() 不是任何类的成员函数
void printWidth(Box box)
{
    /* 因为 printWidth() 是 Box 的友元，它可以直接访问该类的任何成员 */
    cout << "Width of box : " << box.width << endl;
}

// 程序的主函数
int main()
{
    Box box;

    // 使用成员函数设置宽度
    box.setWidth(10.0);

    // 使用友元函数输出宽度
    printWidth(box);

    return 0;
}
```

## 内联函数

```cpp
inline int Max(int x, int y)
{
    return (x > y) ? x : y;
}

// 程序的主函数
int main()
{

    cout << "Max (20,10): " << Max(20, 10) << endl;
    cout << "Max (0,200): " << Max(0, 200) << endl;
    cout << "Max (100,1010): " << Max(100, 1010) << endl;
    return 0;
}
```

## 继承类型

- **公有继承（public）：**当一个类派生自**公有**基类时，基类的**公有**成员也是派生类的**公有**成员，基类的**保护**成员也是派生类的**保护**成员，基类的**私有**成员不能直接被派生类访问，但是可以通过调用基类的**公有**和**保护**成员来访问。
- **保护继承（protected）：** 当一个类派生自**保护**基类时，基类的**公有**和**保护**成员将成为派生类的**保护**成员。

- **私有继承（private）：**当一个类派生自**私有**基类时，基类的**公有**和**保护**成员将成为派生类的**私有**成员。