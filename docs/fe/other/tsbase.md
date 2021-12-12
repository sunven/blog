# TypeScript

## 基础类型

```ts
//
let bool1: boolean = true;
//
let num: number = 1;
//
let name1: string = "a";
let str: string = `a is ${name1}`;
//
let arr: number[] = [1, 2, 3];
let arr1: Array<number> = [1, 2, 3];
//
let x: [string, number] = ["hello", 10];
console.log(x[0] + x[1]); // hello10
//
enum Color {
  red,
  blue,
  green
}
let c1: Color = Color.red;
console.log(c1); // 0
let c2: string = Color[2];
console.log(c2); // green
//
let any1: any = "a";
console.log(typeof any1); // string
any1 = 1;
console.log(typeof any1); // number
any1 = false;
console.log(typeof any1); // boolean
//
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;
```

### 枚举

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

### never

表示永不存在的值的类型

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

## 类型断言

### <>

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

### as

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 忽略undefined和null

```typescript
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

### 确定赋值

`let x: number`表示x在使用前一定会被赋值

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

## 交叉类型

```typescript
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
```

```typescript
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};


```

## 函数

### 箭头函数

```typescript
let fun: (a: string, b: string) => string = (a: string, b: string) => a + b
```

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
