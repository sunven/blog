# blog

a notes blog

```shell
docker run -it --env-file=.env -e "CONFIG=$(cat /Users/seven/project/blog/docsearch.config.json | jq -r tostring)" algolia/docsearch-scraper
```
