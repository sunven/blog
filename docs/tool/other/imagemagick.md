# ImageMagick

[ImageMagick](https://imagemagick.org/)

## 安装

```sh
brew install imagemagick
```

## 使用

### 拼接图片

横着拼接

```sh
convert +append img1.png img2.png img3.png output.png
```

竖着拼接

```sh
convert -append img1.png img2.png img3.png output.png
```

