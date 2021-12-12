# 大型分布式网站架构设计与实践

## 一、基于TCP协议的RPC

### 对象序列化

Hessian

### 基于TCP协议实现RPC

Socket

## 二、基于HTTP协议的RPC

### HTTP协议栈

### HTTP请求与响应

### 通过HttpClient发送HTTP请求

HttpClient 开源项目

### 使用HTTP协议的优势

### JSON和XML

### RESTful和RPC

### 基于HTTP协议的RPC的实现

## 三、服务的演化

### 服务化的演变

配置中心

### 负载均衡算法

1. 轮询（Round Robin）法
2. 随机（Random）法
3. 源地址哈希（Hash）法
4. 加权轮询（Weight Round Robin）法
5. 加权随机（Weight Random）法
6. 最小连接数（Least Connections）法

### 动态配置规则

Groovy

### ZooKeeper

### zkClient

### 路由和负载均衡的实现

## 四、HTTP服务网关
