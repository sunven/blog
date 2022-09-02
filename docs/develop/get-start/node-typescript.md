# node typescript

## 安装依赖

```sh
npm install -D typescript ts-node nodemon eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node
```

## 创建 tsconfig.js

```
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```

生成内容如下

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es6"],
    "module": "commonjs",
    "rootDir": "src",
    "resolveJsonModule": true,
    "allowJs": true,
    "outDir": "build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true                                
  }
}
```

## 创建 nodemon.json

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

## package,json 增加脚本命令

```sh
"start": "nodemon",
"build": "rimraf ./build && tsc",
```

## 创建 .eslintrc.js

```
npx eslint --init
```

或者新建.eslintrc.js文件，内容如下

```js
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
}
```

## 创建 .eslintignore

```
node_modules
dist
```

## package,json 增加脚本命令

```json
{
  "scripts": {
    // ...
    "lint": "eslint . --ext .ts",
  }
}
```
