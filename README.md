# blog

a notes blog

<https://github.com/igorshubovych/markdownlint-cli>

```sh
npm install -g markdownlint-cli

markdownlint  ./docs/**/*.md

markdownlint  ./docs/**/*.md --fix

```

```shell
docker run -it --env-file=/Users/seven/project/blog/.env -e "CONFIG=$(cat /Users/seven/project/blog/docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```
