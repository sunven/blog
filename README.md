# blog

a notes blog

```shell
docker run -it --env-file=/Users/seven/project/blog/.env -e "CONFIG=$(cat /Users/seven/project/blog/docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```
