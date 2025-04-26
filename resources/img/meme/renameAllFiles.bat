@echo off
chcp 65001 >nul

setlocal enabledelayedexpansion

:: 初始化计数器
set /a count=1

:: 遍历当前目录下的所有文件
for %%f in (*) do (
    :: 排除 .bat 文件
    if /i not "%%~xf"==".bat" (
        :: 获取文件的扩展名
        set "ext=%%~xf"
        
        :: 构造新的文件名
        set "newname=!count!!ext!"
        
        :: 重命名文件
        ren "%%f" "!newname!"
        
        :: 计数器递增
        set /a count+=1
    )
)

echo 文件重命名完成！
pause