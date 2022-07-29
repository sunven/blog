# 添加右键菜单

## windows

自行修改路径，存为`.reg`文件后打开

### Sublime Merge

#### Install Sublime Merge.reg

```powershell
Windows Registry Editor Version 5.00

;Directory
[HKEY_CLASSES_ROOT\Directory\shell\Open with Sublime Merge]
@="Open with Sublime Merge"
"Icon"="D:\\Program Files\\Sublime Merge\\sublime_merge.exe,0"

[HKEY_CLASSES_ROOT\Directory\shell\Open with Sublime Merge\command]
@="D:\\Program Files\\Sublime Merge\\sublime_merge.exe %1"

;Background
[HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Sublime Merge]
@="Open with Sublime Merge"
"Icon"="D:\\Program Files\\Sublime Merge\\sublime_merge.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Sublime Merge\command]
@="D:\\Program Files\\Sublime Merge\\sublime_merge.exe %v"
```

#### Uninstall Sublime Merge.reg

```powershell
Windows Registry Editor Version 5.00

[-HKEY_CLASSES_ROOT\*\shell\Open with Sublime Merge]
[-HKEY_CLASSES_ROOT\Directory\shell\Open with Sublime Merge]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Sublime Merge]
```

### Sublime Text

#### install_sublime.reg

```powershell
Windows Registry Editor Version 5.00

;shell
[HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text]
@="Open with Sublime Text"
"Icon"="C:\\Program Files\\Sublime Text 3\\sublime_text.exe,0"

[HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\command]
@="C:\\Program Files\\Sublime Text 3\\sublime_text.exe %1"

;Directory
[HKEY_CLASSES_ROOT\Directory\shell\Open with Sublime Text]
@="Open with Sublime Text"
"Icon"="C:\\Program Files\\Sublime Text 3\\sublime_text.exe,0"

[HKEY_CLASSES_ROOT\Directory\shell\Open with Sublime Text\command]
@="C:\\Program Files\\Sublime Text 3\\sublime_text.exe %1"

;Background
[HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Sublime Text]
@="Open with Sublime Text"
"Icon"="C:\\Program Files\\Sublime Text 3\\sublime_text.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Sublime Text\command]
@="C:\\Program Files\\Sublime Text 3\\sublime_text.exe %v"
```

#### uninstall_sublime.reg

```powershell
Windows Registry Editor Version 5.00

[-HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text]
[-HKEY_CLASSES_ROOT\Directory\shell\Open with Sublime Text]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Sublime Text]
```

### PowerShell

#### install_powershell.reg

```powershell
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\shell\PowerShell]
"Icon"="C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe,0"

[HKEY_CLASSES_ROOT\Directory\shell\PowerShell\Command]
@="C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -NoExit -Command \"cd %V\""

[HKEY_CLASSES_ROOT\Directory\Background\shell\PowerShell]
"Icon"="C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\PowerShell\Command]
@="C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -NoExit -Command \"cd %V\""
```

#### uninstall_powershell.reg

```powershell
Windows Registry Editor Version 5.00

[-HKEY_CLASSES_ROOT\Directory\shell\PowerShell]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\PowerShell]
```

### Windows Terminal

```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\directory\background\shell\wt]
@="在终端中打开"
"Icon"="C:\\Users\\Administrator\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe"

[HKEY_CLASSES_ROOT\directory\background\shell\wt\command]
@="C:\\Users\\Administrator\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe -d ."

```
