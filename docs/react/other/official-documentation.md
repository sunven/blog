# 官方文档

## immutability

- 时间回溯
- 决定是否re-render,memo, 浅比较 <https://react.dev/reference/react/memo>

key

create- 现在有, 以前没有
destroys  以前有, 现在没有
moved 都有
destroyed > re-created key变了

不是状态

- 随时间变化而保持不变
- 是props从父组件传递过来的
- 能根据state 或 props 计算得到

是状态

副作用在哪里处理，useEffect 是最后一招
