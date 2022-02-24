# 基础

![image](http://images.cnblogs.com/cnblogs_com/daxnet/WindowsLiveWriter/EntityFramework_7091/52029421305_thumb.gif)

- 基础结构层：该层专为其它各层提供技术框架支持。注意，这部分内容不会涉及任何业务知识。众所周知的数据访问的内容，也被放在了该层当中，因为数据的读写是业务无关的
- 领域层：包含了业务所涉及的领域对象（实体、值对象）、领域服务以及它们之间的关系。这部分内容的具体表现形式就是领域模型（Domain Model）。领域驱动设计提倡富领域模型，即尽量将业务逻辑归属到领域对象上，实在无法归属的部分则以领域服务的形式进行定义。
- 应用层：该层不包含任何领域逻辑，但它会对任务进行协调，并可以维护应用程序的状态，因此，它更注重流程性的东西。在某些领域驱动设计的实践中，也会将其称为“工作流层”。应用层是领域驱动中最有争议的一个层次，也会有很多人对其职责感到模糊不清。比如，有些国外的开发人员会觉得，既然不包含领域逻辑，那又如何协调工作任务呢？我会在《应用层与实体事件》章节对这些问题进行探讨
- 表现层：这个好理解，跟三层里的表现层意思差不多，但请注意，“Web服务”虽然是服务，但它是表现层的东西

## 实体

## 值对象

## 聚合