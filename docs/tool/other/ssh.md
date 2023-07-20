# ssh

expect 文件

```shell
#!/usr/bin/expect -f
  set user ubuntu
  set password TxYsL.19920210
  set host 1.116.38.44
  set port 22
  set timeout -1

  spawn ssh $user@$host
  expect "*assword:*"
  send "$password\r"
  interact
```

![img](../../.images/Snipaste_2021-10-13_14-04-21.png)

iterm2login.sh

```shell
#!/usr/bin/expect

set timeout 30
spawn ssh [lindex $argv 0]@[lindex $argv 1]
expect {
        "(yes/no)?"
        {send "yes\n";exp_continue}
        "password:"
        {send "[lindex $argv 2]\n"}
}
interact
```

iTerm2 配置

![img](../../.images/Snipaste_2021-10-13_14-08-11.png)

/bin/zsh

/Users/seven/iterm2login.sh ubuntu 11.116.138.44 123456
