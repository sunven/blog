# ffmpeg

## ts 文件，m3u8文件，key

m3u8里面有ts文件列表，

在m3u8种替换key

\#EXT-X-KEY:METHOD=AES-128,URI="key.txt"

```bash
ffmpeg -allowed_extensions ALL -protocol_whitelist "file,http,crypto,tcp" -i a.m3u8 b.mp4
```

