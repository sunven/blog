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

## 接口