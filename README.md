# blog

a notes blog

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

```shell
docker run -it --env-file=/Users/seven/project/blog/.env -e "CONFIG=$(cat /Users/seven/project/blog/docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```

```shell
docker run -it --env-file=F:\\github\\blog\\.env -e "CONFIG=$(cat F:\\github\\blog\\docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```
