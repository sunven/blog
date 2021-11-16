# JavaScript 中的相等

## 相等算法

- 非严格相等（==）
- 严格相等（===）
- 同值零（Map，Set）
- 同值
- 

## 值比较操作

- ==
- ===
- Object.is



## 非严格相等 ==
比较两个值是否相等，在比较前将两个被比较的值转换为相同类型



|  |  | 被比较值B |  |  |  |  |  |
| :--- | :--- | :---: | :---: | --- | --- | --- | --- |
|  |  | Undefined | Null | Number | String | Boolean | Object |
| 被
比
较
值
 A | Undefined | `true` | `true` | `false` | `false` | `false` | `IsFalsy(B)` |
|  | Null | `true` | `true` | `false` | `false` | `false` | `IsFalsy(B)` |
|  | Number | `false` | `false` | `A === B` | `A === ToNumber(B)` | `A=== ToNumber(B)` | `A== ToPrimitive(B)` |
|  | String | `false` | `false` | `ToNumber(A) === B` | `A === B` | `ToNumber(A) === ToNumber(B)` | `ToPrimitive(B) == A` |
|  | Boolean | `false` | `false` | `ToNumber(A) === B` | `ToNumber(A) === ToNumber(B)` | `A === B` | ToNumber(A) == ToPrimitive(B) |
|  | Object | false | false | `ToPrimitive(A) == B` | `ToPrimitive(A) == B` | ToPrimitive(A) == ToNumber(B) | `A === B` |



- ToNumber(A) 表示尝试在比较前将参数A转换为数字，与+A效果相同
- ToPrimitive(A)通过尝试调用 A 的A.toString() 和 A.valueOf() 方法，将参数 A 转换为原始值



## 严格相等 ===
两个被比较的值在比较前都不进行隐式转换，两个被比较的值类型相同，值也相同，就是全等的


- 两个NaN不是全等的
- +0和-0是全等的



## 同值相等
有`Object.is`提供
与===不同

- 两个NaN是相等的
- +0和-0是不相等的



## 零值相等
与同值相等类似，不过认为+0和-0是相等的
