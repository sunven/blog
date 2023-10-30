# memos 部署到 fly.io

<https://usememos.com/docs/install/managed#flyio>

```
# fly.toml app configuration file generated for sunven on 2023-05-10T22:20:51+08:00
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

app = "sunven"
primary_region = "hkg"

[http_service]
  internal_port = 5230
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true

[build]
  image = "hu3rror/memos-fly:latest"

[env]
  DB_PATH = "/var/opt/memos/memos_prod.db"  # do not change
  LITESTREAM_REPLICA_BUCKET = "memos-vault"  # change to your litestream bucket name
  LITESTREAM_REPLICA_ENDPOINT = "s3.us-east-005.bhjkblazeb2.com"  # change to your litestream endpoint url
  LITESTREAM_REPLICA_PATH = "memos_prod.db"  # keep the default or change to whatever path you want

[mounts]
  source="memos_data"
  destination="/var/opt/memos"

[[services]]
  internal_port = 5230
```
