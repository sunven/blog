# Scoop

## Installation

- 0

```sh
[environment]::setEnvironmentVariable('SCOOP','D:\scoop','User')
# powershell 7
[System.Environment]::SetEnvironmentVariable('SCOOP', 'D:\scoop', [System.EnvironmentVariableTarget]::User)
```

- 1

```sh
iwr -useb get.scoop.sh | iex
```

## proxy

<https://github.com/ScoopInstaller/Scoop/wiki/Using-Scoop-behind-a-proxy>

```sh
scoop config proxy 127.0.0.1:7890
```

<https://github.com/kkzzhizhou/scoop-apps>

<https://github.com/lzwme/scoop-proxy-cn>

## choco

```sh
[environment]::setEnvironmentVariable('ChocolateyInstall','D:\chocolatey','User')
[environment]::setEnvironmentVariable('ChocolateyToolsLocation','D:\tools','User')
```

```sh
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

```sh
choco config set proxy http://127.0.0.1:7890
```

uninstall

<https://docs.chocolatey.org/en-us/choco/uninstallation>
