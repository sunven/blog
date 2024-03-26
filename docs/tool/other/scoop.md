# Scoop

## Installation

- 0

```sh
[environment]::setEnvironmentVariable('SCOOP','D:\scoop','User')
[System.Environment]::SetEnvironmentVariable('SCOOP', 'D:\scoop', [System.EnvironmentVariableTarget]::User)
```

- 1

```sh
irm get.scoop.sh -outfile 'install.ps1'
```

- 2

```sh
.\install.ps1 -RunAsAdmin -ScoopDir 'D:\Applications\Scoop' -ScoopGlobalDir 'D:\GlobalScoopApps' -NoProxy
```

不是管理员运行则去掉`-RunAsAdmin`

## proxy

<https://github.com/ScoopInstaller/Scoop/wiki/Using-Scoop-behind-a-proxy>

```sh
scoop config proxy socks5h://127.0.0.1:7890
```

<https://github.com/kkzzhizhou/scoop-apps>

<https://github.com/lzwme/scoop-proxy-cn>
