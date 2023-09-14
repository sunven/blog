# 编程范式

## OOP（面向对象编程）

- 将数据和操作数据的函数组织为对象的形式来构建程序
- 对象是程序的基本单元
- 强调封装、继承和多态等概念

适用于构建复杂的、可扩展的软件系统

```js
class Task {
  constructor(title, description, deadline) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.completed = false;
  }

  completeTask() {
    this.completed = true;
  }

  editTask(title, description, deadline) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
  }
}

const task1 = new Task("完成报告", "编写月度报告", "2022-12-31");
task1.completeTask();
console.log(task1.completed); // 输出: true
```

## FP（函数式编程）

- 函数被视为一等公民
- 关注函数的组合,不可变性和无副作用

适用于处理数据的纯粹性和复杂性

```python
def add(x, y):
  return x + y

def subtract(x, y):
  return x - y

print(subtract(add(10, 5), 3)) # 输出12
```

## FRP（函数式响应编程）

- 依赖的值发生变化时,可以自动重新计算结果
- 在FP基础上,添加了对值变化的响应机制

适用于构建实时和响应式的应用程序。开发界面用户交互和异步编程

```js
import { fromEvent } from 'rxjs';

const taskCompletedEvent = fromEvent(document, 'taskCompleted');

taskCompletedEvent.subscribe(() => {
  console.log('任务已完成');
});

// 模拟任务完成事件
document.dispatchEvent(new Event('taskCompleted'));
```
