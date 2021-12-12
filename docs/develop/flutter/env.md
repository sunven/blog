# Flutter

## env

```sh
# 安装
mkdir ~/gitee && cd ~/gitee
git clone https://gitee.com/mirrors/Flutter.git
# git remote remove origin
# git remote add origin https://github.com/flutter/flutter.git

# 安装dart
./bin/dart --version

# flutter and dart 环境变量配置
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export FLUTTER_HOME=~/gitee/Flutter
export DART_HOME=$FLUTTER_HOME/cache/bin/cache/dart-sdk
export PATH=$FLUTTER_HOME/bin:$DART_HOME/bin:$PATH

# 查看 dart & flutter 版本
dart --version
flutter --version
# 检查 flutter
flutter doctor
# flutter 升级
flutter upgrade
```

环境变量：~/.bash_profile

刷新环境变量：source ~/.bash_profile

## Building a web application with Flutter

### master

```
git clone https://github.com/flutter/flutter
```

如果 flutter 项目不是 master 分支切换至 master 分支

```
flutter channel
```

或使用 git 切换分支

### 更新 sdk

```
flutter upgrade
```

### 启用 web 工具

```
flutter config --enable-web
```

### 创建项目

```
flutter create .
```

### 运行

```
flutter run -d chrome
```

### 构建

```
flutter build web
```

### reference

[Building a web application with Flutter](https://flutter.dev/docs/get-started/web)
