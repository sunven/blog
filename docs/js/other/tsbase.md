# TypeScript

<https://jkchao.github.io/typescript-book-chinese/>

类型注解`:TypeAnnotation`

泛型 约束类型一致，而不是约定某种类型，例如输入输出一致

联合类型 `string | number`

交叉类型 `T & U`

元组 `:[typeofmember1, typeofmember2]`

类型别名 `type SomeName = someValidTypeAnnotation`

## declare

```ts
interface ReturnString {
  (): string;
  new (): string;
}

// 'const' declarations must be initialized
const foo1: ReturnString;

// 'ReturnString' only refers to a type, but is being used as a value here
const foo2: ReturnString = ReturnString();

declare const foo: ReturnString;
const bar = foo(); // bar 被推断为一个字符串。

declare const Two: ReturnString;
const two = new Two(); // two 被推断为 string 类
```

函数做参数，函数参数个数不约束

```ts
type F = (err: Error, data: any) => void
let a: F = function (a) { } // 参数数量可以少
```

## 枚举

本质

```ts
enum Color {
  red,
  blue,
  green
}

const Color = {
  "0": "red",
  "1": "blue",
  "2": "green",
  "red": 0,
  "blue": 1,
  "green": 2
} 
```

编译前

```typescript
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
```

编译后

```javascript
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```

## 字面量类型

```ts
// let 不行，如果是let foo类型是number
const foo = 123;
let bar: typeof foo; // 'bar' 类型与 'foo' 类型相同（在这里是： 123）

bar = 123; // ok
bar = 789; // Type '789' is not assignable to type '123'
```

## never

- void 表示没有任何类型
- never 表示永远不存在的值的类型

```ts
function fn(): never {
  // 如果是个死循环，则应该是个 never
  while (true) { }
}

function fn1() {
  throw new Error();
}

const fn2 = () => { throw new Error() }

let a: never = fn();
a = fn1() // 函数声明不能识别为 never
a = fn2() // 函数表达式（字面量） 可以识别为 never
```

```typescript
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```

如果Foo变为`type Foo = string | number | boolean;`

在else中，foo就是boolean类型，编译就会报错

## 索引签名

- 属性和索引签名不要同时使用，如果需要应该使用嵌套

```ts
interface Bar {
  [key: string]: number;
  x: number;
  y: string; // Error: y 属性必须为 number 类型
}

type Index = "a" | "b" | "c";
type FromIndex = { [k in Index]?: number };

type FromSomeIndex<K extends string> = { [key in K]: number };

// 同时拥有 string 和 number 类型的索引签名
interface ArrStr {
  [key: string]: string | number; // 必须包括所用成员类型
  [index: number]: string; // 字符串索引类型的子级

  // example
  length: number;
}
```

```ts
type FieldState = {
  value: string;
};

type FormState = { isValid: boolean } & { [fieldName: string]: FieldState };

// type FromState = {
//   isValid: boolean; // Error: 不符合索引签名
//   [filedName: string]: FieldState;
// };

// 将它用于从某些地方获取的 JavaScript 对象
declare const foo: FormState;

const isValidBool = foo.isValid;
const somethingFieldState = foo["something"];

// 使用它来创建一个对象时，将不会工作
const bar: FormState = {
  // 'isValid' 不能赋值给 'FieldState'
  isValid: false, // 这里的isValid 要么符合属性，要么符合签名，不能都符合，所以报错
  // isValid: { value: "" },
};

```

## 捕获键的名称 keyof

```ts
const colors = {
  red: 'red',
  blue: 'blue'
};

type Colors = keyof typeof colors;

let color: Colors; // color 的类型是 'red' | 'blue'
color = 'red'; // ok
color = 'blue'; // ok
color = 'anythingElse'; // Error
```

## 混合

```ts
// 所有 mixins 都需要
type Constructor<T = {}> = new (...args: any[]) => T;

// 添加属性的混合例子
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class User {
  name = "";
}

// 添加 Timestamped 的 User
const TimestampedUser = Timestamped(User);

// 这里可以实现相功能，但 User 是写死的
// TimestampedUser 中的 TBase 是活的
// 多个类型需要增加属性时，混合的优势就出来的
class TimestampedUser1 extends User {
  timestamp = Date.now();
}

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);
const timestampedUserExample1 = new TimestampedUser1();
console.log(timestampedUserExample1.timestamp);
```

## 类型断言 `<>` as

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// let strLength: number = (someValue as string).length;
```

```ts
// 适合使用
function handler(event: Event) {
  const mouseEvent = event as MouseEvent;
}

interface Foo {
  bar: number;
  bas: string;
}

// 无法提示错误
const foo = {
  bar: 1,
} as Foo;

// Property 'bas' is missing in type '{ bar: number; }' but required in type 'Foo'.
const foo1: Foo = {
  bar: 1,
};
```

- `<>` 与 JSX 的语法存在歧义, 建议 as
- 编译时语法，不是类型转换
- 应避免使用类型断言

## 类型守卫

### in

```typescript
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  if ("privileges" in emp) {
  }
  if ("startDate" in emp) {
  }
}
```

### typeof

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
  }
  if (typeof padding === "string") {
  }
}
```

### instanceof

```typescript
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

#### 自定义类型保护的类型谓词

```typescript
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```

## 可辨识联合

```typescript
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;
let s: Shape = { size: 2, kind: 'square' }

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

kind就为该类型的辨识

## 接口

### 任意属性

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

const p1 = { name: "semlinker" };
const p2 = { name: "lolo", age: 5 };
const p3 = { name: "kakuqo", sex: 1 }
```

### 接口与类型别名区别

```typescript
//接口
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}

//类型别名
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```

区别

```typescript
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

```

## infer

表示在 extends 条件语句中待推断的类型变量。

- 用于提取函数类型的返回值类型
- 用于提取构造函数中参数（实例）类型

```ts
type ParamType<T> = T extends (arg: infer P) => any ? P : T;

type Func = (a: string) => void;
type Func1 = (a: string, b: number) => void;

type Param = ParamType<Func>; // Param = string
type Param1 = ParamType<Func1>; // Param1 =  (a: string, b: number) => void
type Param2 = ParamType<string>; // Param2 = string
```

## 装饰器

### 类装饰器

```ts
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

@sealed
class BugReport {
  @format("Hello world, %s")
  private _x: string;
  title: string;

  @Prop()
  public Aprop!: string;

  constructor(title: string) {
    this._x = title;
    this.title = title;
  }

  @configurable(true)
  get x() {
    return 'get,' + this._x;
  }

  @enumerable(true)
  greet() {
    return "Hello, " + this.title;
  }

  @Metadata1()
  metadataFun(a: number, b: number): number {
    return a + b;
  }

  greetFormat() {
    let formatString = getFormat(this, "_x");
    return formatString.replace("%s", this._x);
  }
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 类中方法 enumerable 默认为false 不可枚举
    descriptor.enumerable = value;
  };
}

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
function Prop() {
  return (target: any, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    console.log(`${key} type: ${type.name}`);
  };
}

function Metadata1() {
  return (target: any, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    const paramtypes = Reflect.getMetadata('design:paramtypes', target, key);
    const returntype = Reflect.getMetadata('design:returntype', target, key);
    console.log(key, type.name, paramtypes.map((c: any) => c.name), returntype.name);
  };
}

const br = new BugReport('title');

// test @sealed
// Cannot add property title, object is not extensible 
// BugReport.prototype.title = 'title';

// test @configurable
// 与 @sealed 有冲突
// console.log('delete x before', br.x);
// // delete 操作只会在自身的属性上起作用,即 delete br.x 无效
// delete BugReport.prototype.x
// console.log('delete x after', br.x)

// test @enumerable
// for (const a in br) {
//   console.log(a)
// }

console.log(br.greetFormat())
```

### 控制反转 依赖注入

```ts
import "reflect-metadata";

type Constructor<T = any> = new (...args: any[]) => T;

// 相当于一个空的类装饰器
// 用于标记一下 TestService
const Injectable = (): ClassDecorator => target => { };

class OtherService {
  a = 1;
}

@Injectable()
class TestService {
  constructor(public readonly otherService: OtherService) { }

  testMethod() {
    console.log(this.otherService.a);
  }
}

function Factory<T>(target: Constructor<T>):T{
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
  console.log(providers)
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
}

Factory(TestService).testMethod(); // 1
```

### covariance and contravariance

```ts
class Animal {
  hx() {
    console.log('呼吸')
  }
}

class Dog extends Animal {
  gj() {
    console.log('狗叫')
  }
}

class Greyhound extends Dog {
  color = "grey"
}

class GermanShepherd extends Dog {
  name = 'GermanShepherd'
}

type G = (dog: Dog) => Dog

function fun(g: G) {
  const r = g(new Dog())
  r.gj()
}

function greyhoundToGreyhound(greyhound: Greyhound) {
  return greyhound
}

function greyhoundToAnimal(greyhound: Greyhound) {
  return greyhound as Animal
}

function animalToAnimal(an: Animal) {
  return an
}

function animalToGreyhound(an: Animal) {
  return an as Greyhound
}

// Property 'color' is missing in type 'Dog' but required in type 'Greyhound'.
fun(greyhoundToGreyhound)
// Type 'Dog' is not assignable to type 'Greyhound'.
fun(greyhoundToAnimal)
// Property 'gj' is missing in type 'Animal' but required in type 'Dog'.
fun(animalToAnimal)
// ok
fun(animalToGreyhound)
```

<https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance>

- 返回值类型是协变的 `A ≼ B 就意味着 (T → A) ≼ (T → B)`
- 而参数类型是逆变的 `A ≼ B 就意味着 (B → T) ≼ (A → T)`

## type-challenges

Equal

- 捏造一个T

```ts
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
```

Pick

```ts
type MyPick<T, K extends keyof T> = { [p in K]: T[p] }
```

TupleToObject

```ts
type TupleToObject<T extends readonly any[]> = {
  [k in T[number]]: k
}
```

### First & Last & Pop

- infer

```ts
type First<T extends any[]> = T extends [infer F, ...any] ? F : never
type Last<T extends any[]> = T extends [...any, infer Y] ? Y : never
type Pop<T extends any[]> = T extends [...infer X, any] ? X : never
```

Exclude

```ts
type MyExclude<T, U> =  T extends U ? never : T
```

recursion infer

```ts
type MyAwaited<T> = T extends Promise<infer F> ? MyAwaited<F> : T
```

If

```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```

Includes

```ts
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : Includes<R, U>
  : false;
```

MyParameters

```ts
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer X) => any ? X : never;
```

MyReturnType

```ts
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer X ? X : never
```

MyOmit

```ts
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

MyReadonly2

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & { [P in Exclude<keyof T, K>]: T[P] }
```

DeepReadonly

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Function
    ? T[K]
    : T[K] extends object
      ? DeepReadonly<T[K]>
      : T[K]
}
```

TupleToUnion

```ts
type TupleToUnion<T extends any[]> = T[number]
```

Chainable

```ts
type Chainable<T = {}> = {
  option<K extends string, P>(
    key: K extends keyof T
      ? (Equal<P, T[K]> extends true ? never : K)
      : K,
    value: P
  ): Chainable<Omit<T, K> & Record<K, P>>
  get(): T
}
```

- T = {} 来作为默认值 用来存储
- K必须要，要判断重复的key
- key 重复，且value类型形同，则never
- Omit 排除同名key,即同名key的覆盖

PromiseAll

```ts
declare function PromiseAll<T extends any[]>(
  value: readonly [...T]
): Promise<{ [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P] }>
```

TrimLeft Trim

```ts
type Blank = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${Blank}${infer Tail}` ? TrimLeft<Tail> : S
type Trim<S extends string> = S extends `${Blank}${infer Tail}` ? Trim<Tail> : S extends `${infer Tail}${Blank}` ? Trim<Tail> : S
```

MyCapitalize

```ts
type MyCapitalize<S extends string> = S extends `${infer F}${infer Rest}` ? `${Uppercase<F>}${Rest}` : S;
```

### Replace & ReplaceAll

```ts
type Replace<S extends string, From extends string, To extends string> = S extends `${infer L}${From}${infer R}` ? `${L}${From extends '' ? '' : To}${R}` : S

type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${ReplaceAll<L, From, To>}${To}${ReplaceAll<R, From, To>}`
  : S;
```

### AppendArgument

```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R ? (...args: [...P, A]) => R : never
```

### Permutation

```ts
// T extends U中的T如果是一个联合类型,如：A | B | C，则这个表达式会被展开成
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
// [U] extends [never] 而不是 U extends never 因为  U是联合类型 条件类型会走分配得到的是一个联合类型  不符合期望
type Permutation<T, U = T> = [U] extends [never] ? [] : (T extends U  ? [T, ...Permutation<Exclude<U, T>>] : [])
```

### LengthOfString

```ts
type LengthOfString<S extends string, A extends any[] = []> =
  S extends `${infer R}${infer U}`
  ? LengthOfString<U, [...A, R]>
  : A['length']
```

### Flatten

```ts
type Flatten<T> = T extends [infer F, ...infer Rest] ? [...(F extends unknown[] ? Flatten<F> : [F]), ...Flatten<Rest>] : []
```

### AppendToObject

```ts
type AppendToObject<T, U extends string | number | symbol, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
}
```

### Absolute

```ts
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? `${R}` : `${T}`
```

### StringToUnion

```ts
type StringToUnion<T extends string> = T extends `${infer F}${infer R}` ? F | StringToUnion<R> : never
```

### Merge

```ts
type Merge<F, S> = {
  [K in keyof (S & F)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
}

```

## TODO

- as const
- declare
- d.ts
- implements 与 extends

- 接口主要强调结构
- 泛型提供约束
