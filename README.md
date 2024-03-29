# blog

a notes blog.

## markdown lint

<https://github.com/igorshubovych/markdownlint-cli>

```sh
npm install -g markdownlint-cli

markdownlint  ./docs/**/*.md

markdownlint  ./docs/**/*.md --fix

```

## docsearch

<https://docsearch.algolia.com/docs/legacy/run-your-own/>

- 依赖jq

### macos

```shell
docker run -it --env-file=/Users/seven/project/blog/.env -e "CONFIG=$(cat /Users/seven/project/blog/docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```

### window

```shell
docker run -it --env-file=F:\\github\\blog\\.env -e "CONFIG=$(cat F:\\github\\blog\\docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```

执行报错：Expecting property name enclosed in double quotes

可能是cat在powershell的支持问题，导致解析出来的json没有双引号

在git bash中执行，前面加上winpty:

```shell
winpty docker run -it --env-file=F:\\github\\blog\\.env -e "CONFIG=$(cat F:\\github\\blog\\docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```

markdown-it-katex 貌似不支持行内的katex 有 < 符号,需要重新学一个

## vuepress > vitepress

- 不识别的语言报错
- c# > csharp
- c++ > cpp
- build: 文件名含有&或空格报错
- tsconfig.json:
  - include: `"docs/**/*"` 识别不到 docs 中的 .vitepress , 需要新增一个 `"docs/.vitepress/**/*"`
