# C# 栈的应用

> 栈的特性：后进先出（LIFO）

## 回文判断

类似 123321，123a321 即为回文

思路：

- 将字符串前一半入栈
- 依次弹出栈与字符串后一半比较

```csharp
public static bool IsPlalindrome(string str)
{
    var stack = new Stack<char>();
    for (int i = 0; i < str.Length / 2; i++)
    {
        stack.Push(str[i]);
    }

    var len = str.Length % 2 == 0 ? str.Length / 2 : (str.Length + 1) / 2;
    for (int i = len; i < str.Length; i++)
    {
        if (stack.Pop() != str[i])
        {
            return false;
        }
    }
    return true;
}
```

## 进制转化

10 进制转 8 进制 1024→2000

转换流程如下：

| N    | N div | N mod |
| ---- | ----- | ----- |
| 1024 | 128   | 0     |
| 128  | 16    | 0     |
| 16   | 2     | 0     |
| 2    | 0     | 2     |

思路：

- 取模入栈
- 整除运算直至为 0

实现如下：

```csharp
private static void Main()
{
    Console.WriteLine(Get(4396, 8));
    Console.ReadKey();
}

public static int Get(int value, int i)
{
    var stack = new Stack<int>();
    while (value != 0)
    {
        stack.Push(value % i);
        value /= i;
    }
    return int.Parse(string.Join("", stack));
}
```

## 括号匹配

- 圆括号、方括号和花括号可以任意嵌套
- 正确格式：

```
{{`90[]`}}`(4)
```

- 错误格式：

```
{2(1}1)[3]
```

思路：

- 如果时`(`,`[`,`{` 则入栈
- 如果时`)`,`]`,`}` 则将对应左边括号弹出栈

实现如下：

```csharp
private static void Main()
{
    Console.WriteLine(Check("{abc[1](2)}sss(aaa)[({})]"));
    Console.ReadKey();
}

public static bool Check(string str)
{
    var stack = new Stack<char>();
    foreach (var c in str)
    {
        switch (c)
        {
            case '(':
            case '{':
            case '[':
                stack.Push(c);
                break;
            case ')':
                if (stack.Count == 0 || stack.Pop() != '(')
                {
                    return false;
                }
                else
                {
                    break;
                }
            case '}':
                if (stack.Count == 0 || stack.Pop() != '{')
                {
                    return false;
                }
                else
                {
                    break;
                }
            case ']':
                if (stack.Count == 0 || stack.Pop() != '[')
                {
                    return false;
                }
                else
                {
                    break;
                }
        }
    }
    return stack.Count == 0;
}
```

## 中缀转后缀表达式求值

运算规则

- 从左算到右
- 先乘除，后加减
- 先括号内，后括号外

相邻两个操作符优先级判断如下：

c1 表示前一个操作符，c2 表示后一个操作符

| c1/c2 | +   | -   | \*  | /   | (   | )   |
| ----- | --- | --- | --- | --- | --- | --- |
| `+`   | >   | >   | <   | <   | <   | >   |
| `-`   | >   | >   | <   | <   | <   | >   |
| `*`   | <   | <   | >   | >   | <   | >   |
| /     | <   | <   | >   | >   | <   | >   |
| (     | <   | <   | <   | <   | <   | =   |
| )     | >   | >   | >   | >   |     | >   |

思路：

- 分操作数栈和操作符栈
- 操作数进操作数栈
- 当前操作符优先级大于顶栈操作符则入栈
- 当前操作符优先级小于顶栈操作符，则弹出顶栈，弹出两个操作数运算，运算结果再入栈
- 重复上一步骤，直至将当前操作符入栈
- 若最后两栈都不为空，则依次弹出操作符与操作数计算，直至操作符栈为空，此时操作数栈剩一个元素即为最终结果。

实现如下：

```csharp
private static void Main()
{
    Console.WriteLine(Calculation("(2+3)*2+2*(6-3)/(4-2)+2"));
    Console.ReadKey();
}

public static int Calculation(string str)
{
    //操作数栈
    var opndStack = new Stack<int>();
    //操作符栈
    var optrStack = new Stack<char>();
    foreach (var c in str)
    {
        if (char.IsDigit(c))
        {
            //当前的字符是操作数
            opndStack.Push(int.Parse(c.ToString()));
        }
        else
        {
            //当前的字符是操作符
            while (optrStack.Count != 0)
            {
                var priority = Priority(optrStack.Peek(), c);
                if (priority == '<')
                {
                    //栈顶优先级小与当前操作符
                    //入栈
                    optrStack.Push(c);
                    break;
                }
                if (priority == '=')
                {
                    //栈顶优先级等于当前操作符
                    //就是左右括号匹配，弹出左括号
                    optrStack.Pop();
                    break;
                }

                if (priority != '>')
                {
                    continue;
                }
                //栈顶优先级大于当前操作符
                //需要计算
                var optr = optrStack.Pop();
                var value2 = opndStack.Pop();
                var value1 = opndStack.Pop();
                opndStack.Push(Operate(value1, optr, value2));
            }
            //1.第一次栈为空直接入栈。
            //2.退栈直至为空当前操作符也需要入栈,但")"无需入栈
            if (optrStack.Count == 0 && c != ')')
            {
                optrStack.Push(c);
            }
        }
    }
    while (optrStack.Count != 0)
    {
        var optr = optrStack.Pop();
        var value2 = opndStack.Pop();
        var value1 = opndStack.Pop();
        opndStack.Push(Operate(value1, optr, value2));
    }
    return opndStack.Count == 1 ? opndStack.Pop() : 0;
}

public static int Operate(int value1, char optr, int value2)
{
    switch (optr)
    {
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
        case '*':
            return value1 * value2;
        case '/':
            return value1 / value2;
    }
    return 0;
}

/// <summary>
/// 比较栈顶操作符与当前操作符优先级
/// </summary>
/// <param name="c1">栈顶操作符</param>
/// <param name="c2">当前操作符</param>
/// <returns></returns>
public static char Priority(char c1, char c2)
{
    switch (c1)
    {
        case '+':
        case '-':
            if (c2 == '+' || c2 == '-' || c2 == ')')
            {
                return '>';
            }
            return '<';
        case '*':
        case '/':
            if (c2 == '(')
            {
                return '<';
            }
            return '>';
        case '(' when c2 == ')':
            return '=';
        case '(':
            return '<';
        case ')':
            return '>';
    }
    return '>';
}
```

## reference

[栈的应用](https://blog.csdn.net/gavin_john/article/details/71374487)
